const requests = {
    fetchTrending: `/trending/all/week?language=en-US`,
    fetchNetflixOriginals: `/discover/tv?with_networks=213`,
    fetchTopRated: `/movie/top_rated?language=en-US`,
    fetchActionMovies: `/discover/movie?with_genres=28`,
    fetchComedyMovies: `/discover/movie?with_genres=35`,
    fetchHorrorMovies: `/discover/movie?with_genres=27`,
    fetchRomanceMovies: `/discover/movie?with_genres=10749`, // Added this!
    fetchDocumentaries: `/discover/movie?with_genres=99`,
    // Added these for your new Navbar buttons to work perfectly
    fetchTvTrending: `/trending/tv/week?language=en-US`,
    fetchMovieTrending: `/trending/movie/week?language=en-US`,
};

export default requests;