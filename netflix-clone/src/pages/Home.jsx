import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import requests from '../services/requests';

const Home = ({ setModalMovie, type }) => {
  // Switch banner based on page type (TV or Movies)
  const bannerUrl = type === 'movie' 
    ? requests.fetchTopRated 
    : type === 'tv' 
      ? requests.fetchNetflixOriginals 
      : requests.fetchTrending;

  return (
    <div className="relative pb-20 bg-netflix-black min-h-screen">
      <Banner fetchUrl={bannerUrl} />
      
      <div className="mt-[-150px] relative z-20 space-y-8"> 
        {/* Only show Originals if we are on Home or TV Shows */}
        {(!type || type === 'tv') && (
          <MovieRow 
            title="NETFLIX ORIGINALS" 
            fetchUrl={requests.fetchNetflixOriginals} 
            setModalMovie={setModalMovie} 
          />
        )}

        <MovieRow 
          title="Trending Now" 
          fetchUrl={requests.fetchTrending} 
          setModalMovie={setModalMovie} 
        />

        {/* Top Rated is usually best for the Movies section */}
        {type !== 'tv' && (
          <MovieRow 
            title="Top Rated" 
            fetchUrl={requests.fetchTopRated} 
            setModalMovie={setModalMovie} 
          />
        )}

        <MovieRow 
          title="Action Thrillers" 
          fetchUrl={requests.fetchActionMovies} 
          setModalMovie={setModalMovie} 
        />
        
        <MovieRow 
          title="Comedy Hits" 
          fetchUrl={requests.fetchComedyMovies} 
          setModalMovie={setModalMovie} 
        />
        
        <MovieRow 
          title="Horror Movies" 
          fetchUrl={requests.fetchHorrorMovies} 
          setModalMovie={setModalMovie} 
        />

        {/* Added Romance just to fill up the page better */}
        <MovieRow 
          title="Romance Hits" 
          fetchUrl={requests.fetchRomanceMovies} 
          setModalMovie={setModalMovie} 
        />
      </div>
    </div>
  );
};

export default Home;