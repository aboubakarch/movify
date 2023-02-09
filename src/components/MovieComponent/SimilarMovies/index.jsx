import MovieCard from "components/common/MovieCard";
import React from "react";
import Skeleton from "react-loading-skeleton";

const SimilarMovie = ({ data, loading }) => {
  return (
    <div className="container__fluid__list">
      <h4>
        Similar <span>Movies</span>
      </h4>
      {loading ? (
        [...new Array(12)].map((_, idx) => (
          <div className="list__item" key={idx}>
            <Skeleton width="100%" height={350} />
          </div>
        ))
      ) : data?.length ? (
        data.map((item) => (
          <div className="list__item" key={item.id}>
            <MovieCard data={item} />
          </div>
        ))
      ) : (
        <div className="list__no-record">
          <p>No similar movies exist!</p>
        </div>
      )}
    </div>
  );
};

export default SimilarMovie;
