import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const MyList = ({ setModalMovie }) => {
  const { watchlist } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="pt-28 px-4 md:px-12 bg-netflix-black min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">My Wishlist</h1>
      
      {watchlist && watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4">
          {watchlist.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              setModalMovie={setModalMovie} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-500 text-lg mb-6">You haven't added anything to your list yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-300 transition"
          >
            Browse Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default MyList;