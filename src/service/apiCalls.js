import { client } from ".";

const apiKey = process.env.REACT_APP_API_KEY;

const endpoints = {
  getTopRated: `/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=${apiKey}`,
  getAllMovie: `/discover/movie/?api_key=${apiKey}`,
  searchMovies: `/search/movie/?api_key=${apiKey}&query=`,
  getSessionId: `/authentication/guest_session/new?api_key=${apiKey}`,
  rateMovie: (mid, sessionId) =>
    `/movie/${mid}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`,
  getMovieById: (id) => `/movie/${id}?api_key=${apiKey}`,
  getSimilarMovie: (id) => `/movie/${id}/similar?api_key=${apiKey}`,
};

export const getAllMoviesDTO = (sort) => {
  return client.get({ url: `${endpoints.getAllMovie}&sort_by=${sort}` });
};

export const getTopRatedMovies = () => {
  return client.get({ url: endpoints.getTopRated });
};

export const searchMovies = (search, sort) => {
  return client.get({
    url: `${endpoints.searchMovies}${search}&sort_by=${sort}`,
  });
};

export const getMovieDetail = (id) => {
  return client.get({
    url: endpoints.getMovieById(id),
  });
};

export const getSimilarMovieDTO = (id) => {
  return client.get({
    url: endpoints.getSimilarMovie(id),
  });
};

export const getGuestSessionId = () => {
  return client.get({ url: endpoints.getSessionId });
};

export const rateMovie = (movieId, sessionId, rating) => {
  return client.post({
    url: endpoints.rateMovie(movieId, sessionId),
    data: {
      value: rating,
    },
  });
};
