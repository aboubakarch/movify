import { combineReducers } from "redux";
import moviesReducer, {
  movieReducerInititalState,
} from "store/reducers/moviesReducer";

export const initialState = {
  moviesState: movieReducerInititalState,
};

export default combineReducers({
  moviesState: moviesReducer,
});
