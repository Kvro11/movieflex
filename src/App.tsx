import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppDispatch, RootState } from "./state/store";
import { fetchMovies } from "./state/movieSlice";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Home from "./components/Home";
import Footer from "./components/Footer";
import TvShow from "./pages/TvShow";

import "./App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.movieList);

  useEffect(() => {
    dispatch(fetchMovies({ apiType: "popular" }));
    dispatch(fetchMovies({ apiType: "top_rated" }));
    dispatch(fetchMovies({ apiType: "kdrama" }));
    dispatch(fetchMovies({ apiType: "anime" }));
  }, [dispatch]);

  // console.log(state);

  return (
    <div className="bg-black h-fit">
      <Router>
        <Routes>
          {/* Home Page with Header */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Banner state={state} />
                <Home state={state} />
                <Footer />
              </>
            }
          />

          {/* TV Show Page WITHOUT Header */}
          <Route
            path="/tv-show"
            element={
              <>
                <TvShow />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
