import moment from "moment";
import React from "react";
import { useAlert } from "react-alert";
import Skeleton from "react-loading-skeleton";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { giveRating } from "store/actions/movieActions";
import { getImageFullPath } from "utils";

const MovieInfo = ({ data, loading }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleRate = (rating) => {
    dispatch(giveRating(data.id, rating));
    alert.success("Rating given successfully");
  };
  return (
    <div className="container__fluid__title-sec">
      <h3>{loading ? <Skeleton /> : data?.title}</h3>
      <div className="title-sec__media">
        {loading ? (
          <Skeleton height={500} width={500} />
        ) : (
          <img src={getImageFullPath(data?.poster_path)} alt={data?.title} />
        )}
        <div className="media__detail">
          <div className="detail__item">
            <h6>Genres:</h6>
            <p>
              {loading ? (
                <Skeleton />
              ) : (
                data?.genres.map((item) => item.name)?.toString()
              )}
            </p>
          </div>
          <div className="detail__item">
            <h6>Produced By:</h6>
            <p>
              {loading ? (
                <Skeleton />
              ) : (
                data?.production_companies?.map((item) => item.name)?.toString()
              )}
            </p>
          </div>
          <div className="detail__item">
            <h6>Countries:</h6>
            <p>
              {loading ? (
                <Skeleton />
              ) : (
                data?.production_countries?.map((item) => item.name)?.toString()
              )}
            </p>
          </div>
          <div className="detail__item">
            <h6>Release Date:</h6>
            <p>
              {loading ? (
                <Skeleton />
              ) : (
                moment(data?.release_date).format("DD MMM YYYY")
              )}
            </p>
          </div>
          <div className="detail__item">
            <h6>Languages:</h6>
            <p>
              {loading ? (
                <Skeleton />
              ) : (
                data?.spoken_languages?.map((item) => item.name)?.toString()
              )}
            </p>
          </div>
          <div className="detail__item">
            <h6>Runtime:</h6>
            <p>{loading ? <Skeleton /> : data?.runtime} minutes</p>
          </div>
          <div className="detail__item detail__item-overview">
            <h6>Overview:</h6>
            <p>{loading ? <Skeleton /> : data?.overview}</p>
          </div>
          <div className="detail__item">
            <h6>Rate Movie:</h6>
            <ReactStars
              classNames="item__rating"
              count={10}
              size={20}
              activeColor={"#faaa00"}
              onChange={handleRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
