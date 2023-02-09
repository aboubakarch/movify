import Home from "pages/Home";
import MovieDetail from "pages/MovieDetail";
import MoviesStats from "pages/MoviesStats";

// List of Route's name using for links and router
export const appRoutes = Object.freeze({
  home: "/",
  movieDetail: "/movie/:id",
  stats: "/stats",
});

// List of route object which will be rendered under Router component
export default Object.freeze([
  { path: appRoutes.home, component: Home },
  { path: appRoutes.movieDetail, component: MovieDetail },
  { path: appRoutes.stats, component: MoviesStats },
]);
