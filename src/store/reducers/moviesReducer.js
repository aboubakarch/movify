import { movieActionTypes } from "store/actions/movieActions";

export const movieReducerInititalState = {
  loadingTRM: false,
  loadingMovies: false,
  loadingMovie: false,
  topRatedMovies: null,
  movies: null,
  movie: null,
  sessionId: "",
};

const moviesReducer = (state = movieReducerInititalState, action) => {
  const { type, payload } = action || {};
  switch (type) {
    case movieActionTypes.TOGGLE_LOADING_MOVIE: {
      return { ...state, loadingMovie: !state.loadingMovie };
    }
    case movieActionTypes.TOGGLE_LOADING_MOVIES: {
      return { ...state, loadingMovies: !state.loadingMovies };
    }
    case movieActionTypes.TOGGLE_LOADING_TRM: {
      return { ...state, loadingTRM: !state.loadingTRM };
    }
    case movieActionTypes.ADD_MOVIES: {
      return { ...state, movies: payload };
    }
    case movieActionTypes.ADD_TOP_MOVIES: {
      return { ...state, topRatedMovies: payload };
    }
    case movieActionTypes.ADD_MOVIE_DETAILS: {
      return { ...state, movie: payload };
    }
    case movieActionTypes.ADD_SESSION_ID: {
      return { ...state, sessionId: payload };
    }
    default:
      return state;
  }
};

export default moviesReducer;
