import {
  getAllMoviesDTO,
  getGuestSessionId,
  getMovieDetail,
  getSimilarMovieDTO,
  getTopRatedMovies,
  rateMovie,
  searchMovies,
} from "service/apiCalls";

//Action Types
export const movieActionTypes = Object.freeze({
  ADD_MOVIES: "ADD_MOVIES",
  ADD_TOP_MOVIES: "ADD_TOP_MOVIES",
  ADD_MOVIE_DETAILS: "ADD_MOVIE_DETAILS",
  ADD_SESSION_ID: "ADD_SESSION_ID",
  TOGGLE_LOADING_TRM: "TOGGLE_LOADING_TRM",
  TOGGLE_LOADING_MOVIES: "TOGGLE_LOADING_MOVIES",
  TOGGLE_LOADING_MOVIE: "TOGGLE_LOADING_MOVIE",
});

// All Actions
const addMovies = (payload) => {
  return {
    type: movieActionTypes.ADD_MOVIES,
    payload,
  };
};

const addTopRatedMovies = (payload) => {
  return {
    type: movieActionTypes.ADD_TOP_MOVIES,
    payload,
  };
};

const addMovieDetail = (payload) => {
  return {
    type: movieActionTypes.ADD_MOVIE_DETAILS,
    payload,
  };
};

const addSessionId = (payload) => {
  return {
    type: movieActionTypes.ADD_SESSION_ID,
    payload,
  };
};

const toggleLoadingTRM = () => {
  return {
    type: movieActionTypes.TOGGLE_LOADING_TRM,
  };
};

const toggleLoadingMovies = () => {
  return {
    type: movieActionTypes.TOGGLE_LOADING_MOVIES,
  };
};

const toggleLoadingMovie = () => {
  return {
    type: movieActionTypes.TOGGLE_LOADING_MOVIE,
  };
};

// API Calling Via Thunk functions
export const getAllMovies = (sort, search) => async (dispatch) => {
  try {
    dispatch(toggleLoadingMovies());
    const response = !search
      ? await getAllMoviesDTO(sort)
      : await searchMovies(search, sort);
    const data = response.data.results;
    dispatch(addMovies(data));
    dispatch(toggleLoadingMovies());
  } catch (error) {
    dispatch(toggleLoadingMovies());
    console.log(error);
  }
};

export const getTopMovies = () => async (dispatch) => {
  try {
    dispatch(toggleLoadingTRM());

    const response = await getTopRatedMovies();
    const data = response.data.results;
    dispatch(addTopRatedMovies(data));

    dispatch(toggleLoadingTRM());
  } catch (error) {
    dispatch(toggleLoadingTRM());
    console.log(error);
  }
};

export const getMovieById = (id) => async (dispatch) => {
  try {
    dispatch(toggleLoadingMovie());
    const responseDetail = await getMovieDetail(id);
    const responseSimilar = await getSimilarMovieDTO(id);
    const detail = responseDetail.data;
    const similar = responseSimilar.data.results;
    dispatch(addMovieDetail({ detail, similar }));
    dispatch(toggleLoadingMovie());
  } catch (error) {
    dispatch(toggleLoadingMovie());
    console.log(error);
  }
};

export const getSessionId = () => async (dispatch) => {
  try {
    const response = await getGuestSessionId();
    const sessionId = response.data.guest_session_id;
    dispatch(addSessionId(sessionId));
  } catch (error) {
    console.log(error);
  }
};

export const giveRating = (movieId, rating) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { sessionId } = state.moviesState;

    await rateMovie(movieId, sessionId, rating);
    dispatch(getMovieById(movieId));
  } catch (error) {
    console.log(error);
    dispatch(getSessionId());
    dispatch(giveRating(movieId, rating));
  }
};
