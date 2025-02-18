import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppDispatch, RootState } from "./state/store";
import { fetchGenreList } from "./state/genreListSlice";
import { fetchMovies } from "./state/movieSlice";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Home from "./components/Home";
import Footer from "./components/Footer";
import TvShow from "./pages/TvShow";
import MovieShow from "./pages/Movies";
import Search from "./pages/Search";
import MoreShow from "./pages/MoreShow";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.movieList);
  const dispatchList = ["popular", "top_rated", "kdrama", "anime"];
  const [query, setQuery] = useState("");

  const handleSearch = (query: string) => {
    dispatch(fetchMovies({ apiType: "search", page: 1, query }));
    setQuery(query);
  };

  useEffect(() => {
    dispatchList.forEach((list) => {
      dispatch(fetchMovies({ apiType: list, page: 1 }));
    });
    dispatch(fetchGenreList({ apiType: "tvGenre" }));
    dispatch(fetchGenreList({ apiType: "movieGenre" }));
  }, []);

  return (
    <Router>
      <div className="bg-black h-fit">
        <ScrollToTop />
        <Routes>
          {/* Home Page with Header */}
          <Route
            path="/"
            element={
              <>
                <Header handleSearch={handleSearch} />
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
                {/* <Footer /> */}
              </>
            }
          />

          {/* Movie Show Page WITHOUT Header */}
          <Route
            path="/movie-show"
            element={
              <>
                <MovieShow />
                {/* <Footer /> */}
              </>
            }
          />
          {/* Search output */}
          <Route
            path="/search"
            element={
              <>
                <Header handleSearch={handleSearch} />
                <Search query={query} />
                <Footer />
              </>
            }
          />
          <Route
            path="/moreShow"
            element={
              <>
                <Header handleSearch={handleSearch} />
                <MoreShow />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
