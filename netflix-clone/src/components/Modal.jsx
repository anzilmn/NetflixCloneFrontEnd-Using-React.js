/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FaTimes, FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import YouTube from 'react-youtube';
import axiosInstance from '../services/axiosInstance';

const Modal = ({ movie, setOpen }) => {
  const { watchlist, addToWatchlist } = useAuth();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie?.id) return;
      try {
        const res = await axiosInstance.get(`/movies/trailer/${movie.id}`);
        if (res.data?.key) {
          setTrailerUrl(res.data.key);
        }
      } catch {
        console.warn("No trailer found for this movie.");
      }
    };
    
    fetchTrailer();
    
    return () => {
        setPlaying(false);
        setTrailerUrl("");
    };
  }, [movie]);

  if (!movie) return null;

  const isAdded = watchlist.some((m) => m.id === movie.id);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: { 
        autoplay: 1, 
        controls: 1, 
        modestbranding: 1,
        rel: 0 
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-[#181818] rounded-lg overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto"
      >
        <button 
          onClick={() => setOpen(null)} 
          className="absolute top-4 right-4 text-white text-2xl z-[110] bg-black/50 rounded-full p-2 hover:bg-white/20 transition-colors"
        >
          <FaTimes />
        </button>
        
        <div className="relative aspect-video bg-black">
           {playing && trailerUrl ? (
             <div className="w-full h-full">
                <YouTube videoId={trailerUrl} opts={opts} className="w-full h-full" containerClassName="w-full h-full" />
             </div>
           ) : (
             <div className="relative w-full h-full">
               <img 
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`} 
                className="w-full h-full object-cover opacity-60" 
                alt="backdrop" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setPlaying(true)} 
                    className="bg-white/20 hover:bg-white/40 p-6 rounded-full transition-all transform hover:scale-110"
                  >
                    <FaPlay className="text-4xl text-white ml-1" />
                  </button>
               </div>
             </div>
           )}
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-white">
            {movie?.title || movie?.name || movie?.original_name}
          </h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <button 
                onClick={() => setPlaying(!playing)} 
                className="flex items-center space-x-2 bg-white text-black px-8 py-2 rounded-md font-bold hover:bg-gray-200 transition"
            >
              <FaPlay /> <span>{playing ? "Stop" : "Play Trailer"}</span>
            </button>
            
            <button 
                onClick={() => addToWatchlist(movie)} 
                className="group flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full text-white hover:border-white transition"
            >
              {isAdded ? <FaCheck className="text-green-500" /> : <FaPlus />}
            </button>
          </div>

          <div className="flex items-center space-x-2 mb-4 text-sm font-semibold text-white">
            <span className="text-green-400">98% Match</span>
            <span>{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0] || '2026'}</span>
            <span className="border border-gray-600 px-1 text-[10px]">HD</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">
            {movie?.overview || "No description available for this title."}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;