import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import MovieCard from "components/common/MovieCard";
import { getTopMovies } from "store/actions/movieActions";
import { breakpoints } from "constants/filters";

import "assets/styles/home.scss";

const TopMovies = () => {
  const dispatch = useDispatch();
  const { topRatedMovies = [], loadingTRM } = useSelector(
    (state) => state.moviesState
  );

  const getSliceIndex = () => {
    if (window.innerWidth < breakpoints.xs) return 1;
    if (window.innerWidth < breakpoints.sm) return 2;
    if (window.innerWidth < breakpoints.sm) return 3;
    return 4;
  };

  const getSkeltonCount = () => {
    if (window.innerWidth < breakpoints.xs) return [1];
    if (window.innerWidth < breakpoints.sm) return [1, 2];
    if (window.innerWidth < breakpoints.xs) return [1, 2, 3];
    return [1, 2, 3, 4];
  };

  useEffect(() => {
    dispatch(getTopMovies());
  }, []);

  return (
    <div className="home-container bg-image">
      <div className="container__overlay" />
      <div className="container__fluid">
        <div className="container__fluid__title-sec">
          <h3>
            TOP MOVIES <span>OF THIS SEASON</span>
          </h3>
        </div>
        <div className="container__fluid__list">
          {!loadingTRM
            ? topRatedMovies?.slice(0, getSliceIndex()).map((item) => (
                <div className="list__item" key={item.id}>
                  <MovieCard data={item} />
                </div>
              ))
            : getSkeltonCount().map((item) => (
                <div className="list__item" key={item}>
                  <Skeleton height={350} width="100%" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TopMovies;
