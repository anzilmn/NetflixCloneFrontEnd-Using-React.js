import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import MovieCard from '../components/MovieCard';
import Skeleton from '../components/Skeleton';
import Modal from '../components/Modal';
import { AnimatePresence } from 'framer-motion';

const genres = [
  { id: 1, name: "Action", slug: "action" },
  { id: 2, name: "Comedy", slug: "comedy" },
  { id: 3, name: "Horror", slug: "horror" },
  { id: 4, name: "Sci-Fi", slug: "sci-fi" },
];

const TVShows = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('action');
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchByGenre = async () => {
      setLoading(true);
      try {
        // Friend's API endpoint: /movies/genre/:slug
        const res = await axiosInstance.get(`/movies/genre/${selectedGenre}`);
        setMovies(res.data.results || res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchByGenre();
  }, [selectedGenre]);

  return (
    <div className="pt-24 px-8 min-h-screen bg-netflix-black text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">TV Shows</h1>
        <div className="flex space-x-4">
          {genres.map((g) => (
            <button 
              key={g.id}
              onClick={() => setSelectedGenre(g.slug)}
              className={`px-4 py-1 rounded-full border border-gray-600 transition ${selectedGenre === g.slug ? 'bg-white text-black font-bold' : 'hover:bg-gray-800'}`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Skeleton /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map(m => <MovieCard key={m.id} movie={m} setModalMovie={setSelectedMovie} />)}
        </div>
      )}

      <AnimatePresence>
        {selectedMovie && <Modal movie={selectedMovie} setOpen={setSelectedMovie} />}
      </AnimatePresence>
    </div>
  );
};

export default TVShows;