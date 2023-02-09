/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import MovieCard from "components/common/MovieCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllMovies } from "store/actions/movieActions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { sort, sortBy } from "constants/filters";
import { useCallback } from "react";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";
import { sortByFilter } from "utils";

import "assets/styles/home.scss";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { movies = [], loadingMovies } = useSelector(
    (state) => state.moviesState
  );
  const [filter, setFilter] = useState({ sortBy: "popularity", sort: "asc" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const _filter = { ...filter };
    _filter[name] = value;
    setFilter(_filter);
  };

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      dispatch(getAllMovies(sortByFilter(filter), value));
    }, 1000),
    []
  );

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllMovies(sortByFilter(filter)));
  }, [filter]);

  return (
    <div className="home-container">
      <div className="container__fluid">
        <div className="container__fluid__title-sec">
          <h3 className="title-sec__hide">All MOVIES</h3>
          <div className="flex title-sec--sort">
            <input
              name="search"
              onChange={handleSearch}
              placeholder="Search movie"
            />
            <p>Sort By:</p>
            <select name="sortBy" value={filter.sortBy} onChange={handleChange}>
              {sortBy.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
            <select name="sort" value={filter.sort} onChange={handleChange}>
              {sort.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="container__fluid__list">
          {!loadingMovies
            ? movies?.map((item) => (
                <div className="list__item" key={item.id}>
                  <MovieCard data={item} />
                </div>
              ))
            : [...new Array(10)].map((_, idx) => (
                <div className="list__item" key={idx}>
                  <Skeleton height={350} width="100%" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
