import { useState, useEffect } from 'react';
import tmdbInstance from '../services/tmdbInstance'; // Import TMDB instance

const Banner = ({ fetchUrl }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      if (!fetchUrl) return;
      try {
        const res = await tmdbInstance.get(fetchUrl); // Use tmdbInstance
        const results = res.data.results || [];
        if (results.length > 0) {
          const randomMovie = results[Math.floor(Math.random() * results.length)];
          setMovie(randomMovie);
        }
      } catch {
        console.warn("Banner fetch failed from TMDB.");
      }
    };
    fetchBanner();
  }, [fetchUrl]);

  if (!movie) return <div className="h-[56.25vw] bg-netflix-black" />;

  return (
    <header 
      className="relative h-[56.25vw] text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "top center",
      }}
    >
      <div className="ml-8 pt-48 h-48 relative z-10">
        <h1 className="text-2xl md:text-5xl font-extrabold pb-4">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        <div className="flex space-x-4">
          <button className="cursor-pointer text-black font-bold rounded px-8 py-2 bg-white hover:bg-gray-300 transition-all transform active:scale-95">
            Play
          </button>
          <button className="cursor-pointer text-white font-bold rounded px-8 py-2 bg-gray-500/50 hover:bg-gray-500 transition-all transform active:scale-95">
            More Info
          </button>
        </div>

        <h1 className="w-full md:w-[45rem] leading-snug pt-4 text-sm md:text-lg max-w-xs md:max-w-lg h-20 line-clamp-3 text-shadow-md">
          {movie?.overview}
        </h1>
      </div>
      
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
    </header>
  );
};

export default Banner;