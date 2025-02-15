import { combineReducers } from "@reduxjs/toolkit";

import movies from "../movieSlice";
import catalog from "../CatalogSlice";
import genreList from "../genreListSlice";

const rootReducer = combineReducers({
  movieList: movies,
  catalog: catalog,
  genreList: genreList,
});

export default rootReducer;
