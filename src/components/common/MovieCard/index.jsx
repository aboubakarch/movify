import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { appRoutes } from "routes";
import "assets/styles/moviecard.scss";
import { getImageFullPath } from "utils";

const MovieCard = ({ data }) => {
  const router = useHistory();

  return (
    <div
      className="container-card"
      onClick={() =>
        router.push(`${appRoutes.movieDetail.split(":")[0]}${data.id}`)
      }
    >
      <div className="card__media">
        <img src={getImageFullPath(data.poster_path)} alt={data.title} />
        <div className="media__rating">
          <p>{data.vote_average}</p>
        </div>
      </div>
      <div className="card__content">
        <div className="content__title">
          <h2>{data.title}</h2>
        </div>
        <div className="content__meta">
          <p>{`${moment(data.release_date).format("DD MMM yyyy")} | ${
            data.original_language
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
