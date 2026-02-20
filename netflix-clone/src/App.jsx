import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import MyList from './pages/MyList';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext'; 

function App() {
  const [modalMovie, setModalMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { addToWatchlist, watchlist } = useAuth(); 

  const handleModal = async (movie) => {
    if (modalMovie && modalMovie.id === movie.id) {
      setModalMovie(null);
      setTrailerUrl("");
    } else {
      setModalMovie(movie);
      setTrailerUrl(""); 

      const movieName = movie?.title || movie?.name || movie?.original_name || "";
      
      try {
        const url = await movieTrailer(movieName);
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        }
      } catch (error) {
        console.log("Trailer Error:", error);
        setTrailerUrl("");
      }
    }
  };

  const opts = {
    height: "450",
    width: "100%",
    playerVars: { 
      autoplay: 1,
      modestbranding: 1,
      rel: 0 
    },
  };

  const isAdded = modalMovie ? watchlist.some(m => m.id === modalMovie.id) : false;

  return (
    <Router>
      <div className="bg-netflix-black min-h-screen text-white selection:bg-netflix-red selection:text-white">
        <Navbar />
        
        {/* Global Trailer Modal */}
        {modalMovie && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 transition-all">
            <div className="bg-[#181818] w-full max-w-4xl rounded-lg overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => { setModalMovie(null); setTrailerUrl(""); }}
                className="absolute top-4 right-4 text-white text-3xl z-[110] hover:text-netflix-red transition bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>
              
              <div className="relative pt-[56.25%] bg-black"> 
                {trailerUrl ? (
                  <YouTube 
                    videoId={trailerUrl} 
                    opts={opts} 
                    className="absolute top-0 left-0 w-full h-full"
                    onEnd={() => setTrailerUrl("")}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                    <img 
                       src={`https://image.tmdb.org/t/p/original${modalMovie?.backdrop_path}`} 
                       className="absolute inset-0 w-full h-full object-cover opacity-30"
                       alt="backdrop"
                    />
                    <p className="relative z-10 text-gray-400 font-semibold">Trailer not found on YouTube</p>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        {modalMovie?.title || modalMovie?.name}
                    </h2>
                    <button 
                        onClick={() => addToWatchlist(modalMovie)}
                        className={`p-2 rounded-full border-2 transition-all ${isAdded ? 'bg-white text-black border-white' : 'text-white border-gray-500 hover:border-white'}`}
                    >
                        {isAdded ? '✓' : '+'}
                    </button>
                </div>
                
                <div className="flex items-center space-x-4 mb-4 text-green-400 font-semibold">
                    <span>{Math.round(modalMovie?.vote_average * 10)}% Match</span>
                    <span className="text-gray-400">{modalMovie?.release_date?.split('-')[0] || modalMovie?.first_air_date?.split('-')[0]}</span>
                    <span className="border border-gray-600 px-2 text-xs text-gray-400">HD</span>
                </div>

                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                  {modalMovie?.overview}
                </p>
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Main Home Route */}
          <Route path="/" element={<ProtectedRoute><Home setModalMovie={handleModal} /></ProtectedRoute>} />
          
          {/* TV Shows Route - Passing type="tv" */}
          <Route path="/tv-shows" element={<ProtectedRoute><Home setModalMovie={handleModal} type="tv" /></ProtectedRoute>} />
          
          {/* Movies Route - Passing type="movie" */}
          <Route path="/movies" element={<ProtectedRoute><Home setModalMovie={handleModal} type="movie" /></ProtectedRoute>} />
          
          <Route path="/search" element={<ProtectedRoute><Search setModalMovie={handleModal} /></ProtectedRoute>} />
          <Route path="/my-list" element={<ProtectedRoute><MyList setModalMovie={handleModal} /></ProtectedRoute>} />
          
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen bg-netflix-black text-white px-4 text-center">
              <h1 className="text-7xl font-bold mb-4 text-netflix-red">404</h1>
              <p className="text-2xl mb-8">Lost your way?</p>
              <button onClick={() => window.location.href = '/'} className="bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-gray-300">Home</button>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;