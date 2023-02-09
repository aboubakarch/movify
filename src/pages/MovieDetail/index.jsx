/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MovieInfo from "components/MovieComponent/MovieInfo";
import SimilarMovie from "components/MovieComponent/SimilarMovies";
import { getMovieById, getSessionId } from "store/actions/movieActions";

import "assets/styles/moviedetail.scss";

const MovieDetail = () => {
  const { movie, sessionId, loadingMovie } = useSelector(
    (state) => state.moviesState
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMovieById(id));
    if (!sessionId) dispatch(getSessionId());
  }, [id]);

  return (
    <div className="movie-container">
      <div className="container__fluid">
        <MovieInfo
          data={movie?.detail}
          sessionId={sessionId}
          loading={loadingMovie}
        />
        <SimilarMovie data={movie?.similar} loading={loadingMovie} />
      </div>
    </div>
  );
};

export default MovieDetail;
