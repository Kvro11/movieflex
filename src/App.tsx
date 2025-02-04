import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./state/store";
import { fetchMovies } from "./state/movieSlice";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Home from "./components/Home";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.movieList);

  useEffect(() => {
    dispatch(fetchMovies({ apiType: "popular" }));
    dispatch(fetchMovies({ apiType: "top_rated" }));
    dispatch(fetchMovies({ apiType: "kdrama" }));
    dispatch(fetchMovies({ apiType: "anime" }));
  }, []);

  // console.log(state);

  return (
    <div className="bg-black h-fit">
      <Header />
      <Banner state={state} />
      <Home state={state} />
      <Footer />
    </div>
  );
};

export default App;
