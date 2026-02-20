import { useEffect, useState } from 'react';
import tmdbInstance from '../services/tmdbInstance'; // Import TMDB instance
import MovieCard from './MovieCard';

const MovieRow = ({ title, fetchUrl, setModalMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await tmdbInstance.get(fetchUrl); // Use tmdbInstance
        setMovies(request.data.results || request.data);
      } catch (err) {
        console.error("Error fetching TMDB row data", err);
      }
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="ml-5 mb-8 text-white">
      <h2 className="text-xl font-semibold mb-2 ml-2">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} setModalMovie={setModalMovie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;