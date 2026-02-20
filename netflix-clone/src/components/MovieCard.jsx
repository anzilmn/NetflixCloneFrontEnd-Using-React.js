/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const MovieCard = ({ movie, setModalMovie }) => {
  // If no poster is available, we don't want a broken image link
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://via.placeholder.com/500x750?text=No+Image`;

  return (
    <motion.div
      onClick={() => setModalMovie && setModalMovie(movie)}
      whileHover={{ scale: 1.08, zIndex: 40 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex-none w-32 md:w-52 cursor-pointer transition-shadow hover:shadow-[0_0_20px_rgba(0,0,0,0.8)]"
    >
      <img
        src={posterUrl}
        alt={movie.title || movie.name}
        className="rounded-md object-cover w-full h-full shadow-lg"
        loading="lazy"
      />
      
      {/* Black gradient overlay on hover to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3 rounded-md">
        <p className="text-[10px] md:text-sm font-bold truncate text-white w-full">
          {movie.title || movie.name}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;