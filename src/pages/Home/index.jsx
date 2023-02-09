import React from "react";

import TopMovies from "components/HomeComponents/TopMovies";
import AllMovies from "components/HomeComponents/AllMovies";
import "assets/styles/home.scss";

const Home = () => {
  return (
    <>
      <TopMovies />
      <AllMovies />
    </>
  );
};

export default Home;
