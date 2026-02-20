import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });
  
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  // 2. Fetch Watchlist from MongoDB whenever the user changes (logs in)
  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axiosInstance.get("/user/watchlist");
          setWatchlist(res.data);
        } catch (error) {
          console.error("Error fetching watchlist from DB", error);
        }
      } else {
        setWatchlist([]); // Clear watchlist if no user
      }
    };
    fetchWatchlist();
  }, [user]);

  // 3. Signup Function
  const signup = async (email, password) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", { email, password });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration Failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  // 4. Login Function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem("token", token);
      // We store the token in the user state so the useEffect triggers
      setUser({ ...userData, token });
      setWatchlist(userData.watchlist || []);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Login Failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  // 5. Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setWatchlist([]);
  };

  // 6. Add/Remove from Watchlist (Now syncing with MongoDB)
  const addToWatchlist = async (movie) => {
    if (!user) {
        alert("Vro, you need to login first!");
        return;
    }

    try {
      // Step A: Update UI immediately (Optimistic UI)
      const isAlreadyAdded = watchlist.find((m) => m.id === movie.id);
      if (isAlreadyAdded) {
        setWatchlist(watchlist.filter((m) => m.id !== movie.id));
      } else {
        setWatchlist([...watchlist, movie]);
      }

      // Step B: Send to Backend/MongoDB
      await axiosInstance.post("/user/watchlist", { movie });
    } catch (error) {
      console.error("Error syncing watchlist with DB", error);
      // Optional: Refresh watchlist from DB if sync fails
    }
  };

  const value = { 
    user, 
    signup,
    login, 
    logout, 
    loading, 
    watchlist, 
    addToWatchlist 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};