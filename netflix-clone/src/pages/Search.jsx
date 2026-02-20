import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import tmdbInstance from '../services/tmdbInstance';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  
  // Extract query from URL (?q=interstellar)
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      try {
        const res = await tmdbInstance.get(`/search/movie?query=${query}`);
        setResults(res.data.results || []);
      } catch (err) {
        console.error("Search failed", err);
      }
    };
    fetchSearch();
  }, [query]);

  return (
    <div className="pt-24 px-4 md:px-12 bg-netflix-black min-h-screen">
      <h1 className="text-xl md:text-3xl font-semibold text-white mb-8">
        Results for: <span className="text-gray-400">"{query}"</span>
      </h1>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4">
          {results.map((movie) => (
            // We pass null to setModalMovie for now or define a modal logic in App
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 mt-20 text-center">
          <p>Your search for "{query}" did not have any matches.</p>
        </div>
      )}
    </div>
  );
};

export default Search;