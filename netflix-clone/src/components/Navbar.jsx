import { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim() !== '') {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/'); 
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 p-4 px-4 md:px-12 flex justify-between items-center ${isScrolled ? 'bg-netflix-black' : 'bg-transparent'}`}>
      <div className="flex items-center space-x-4 md:space-x-8">
        <h1 
          className="text-netflix-red text-2xl md:text-3xl font-bold uppercase cursor-pointer" 
          onClick={() => navigate('/')}
        >
          Netflix
        </h1>
        {user && (
          <ul className="hidden lg:flex space-x-4 text-white text-sm">
            <li 
              className="cursor-pointer font-semibold hover:text-gray-300" 
              onClick={() => navigate('/')}
            >
              Home
            </li>
            <li 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => navigate('/tv-shows')}
            >
              TV Shows
            </li>
            <li 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => navigate('/movies')}
            >
              Movies
            </li>
            <li 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => navigate('/my-list')}
            >
              My Wishlist
            </li>
          </ul>
        )}
      </div>

      <div className="flex items-center space-x-3 md:space-x-5 text-white">
        {user ? (
          <>
            <div className="flex items-center bg-black/40 border border-gray-600 px-2 py-1 rounded">
              <FaSearch className="text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Titles, people..."
                className="bg-transparent outline-none text-xs md:text-sm ml-2 w-24 md:w-44 lg:w-64"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <FaBell className="cursor-pointer hidden sm:block" />
            
            <div className="group relative">
              <div className="bg-blue-600 p-1.5 rounded cursor-pointer">
                <FaUser />
              </div>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-black/90 border border-gray-700 p-3 rounded shadow-2xl min-w-[150px]">
                <p className="text-xs text-gray-400 mb-2 pb-2 border-b border-gray-700">Account Settings</p>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm w-full hover:text-netflix-red transition"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="bg-netflix-red px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;