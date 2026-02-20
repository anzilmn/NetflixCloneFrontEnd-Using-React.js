import axios from 'axios';

const tmdbInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWRhODViYTExZjk4Y2NlMjc5NThlOGJiMDhjYmVkMSIsIm5iZiI6MTc2MTIzNTI1My4zNjMwMDAyLCJzdWIiOiI2OGZhNTEzNTc4MGUxOWFiYmI4NTMzOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R788GugGksdpyk_ih3VaCNd2ELPdchy9F6ZcQnmYTFA'
    }
});

export default tmdbInstance;