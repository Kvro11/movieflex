import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { PiGitlabLogoFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

interface HeaderProps {
  handleSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleSearch }) => {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const [searchWidth, setSearchWidth] = useState("70%"); // Default for mobile
  const [searchInput, setSearchInput] = useState<string>("");

  const liStyling =
    "hover:text-lightColor cursor-pointer border-2 px-5 rounded-lg sm:px-0 sm:border-0";

  const getTvShow = () => {
    navigate("/tv-show"); // Navigate only after fetching is done
  };

  const getMovieShow = () => {
    navigate("/movie-show"); // Navigate only after fetching is done
  };

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      handleSearch(searchInput);
      navigate("/search"); // ✅ Now works correctly
    }
  };

  const backHomeBtn = () => {
    navigate("/");
    setSearchInput("");
    setDisplay(false);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (searchRef.current && !searchRef.current?.contains(event.target)) {
      setDisplay(false); // Hide the search bar if clicked outside
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSearchWidth(window.innerWidth >= 640 ? "25%" : "70%"); // sm breakpoint = 640px
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (display) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      setSearchInput("");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [display]);

  return (
    <div
      className="h-fit p-5 flex flex-col sm:flex-row sm:items-center 
      sm:justify-between gap-3 sm:px-12 sm:py-4 bg-primaryColor text-lightColor"
    >
      {/* First row: Logo & Search */}
      <div className="w-full flex justify-between items-center">
        <div
          className="flex items-center gap-1 sm:gap-3 cursor-pointer"
          onClick={backHomeBtn}
        >
          <span className="text-5xl sm:text-6xl">
            <PiGitlabLogoFill />
          </span>
          <h1 className="text-xl font-black sm:text-4xl hidden sm:block">
            MovieFlex
          </h1>
        </div>
        <AnimatePresence mode="wait">
          {!display ? (
            <motion.div
              key="searchIcon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 font-bold text-defaultTxt
                sm:mr-4 hover:text-lightColor cursor-pointer"
              onClick={() => setDisplay((prev) => !prev)}
              ref={searchRef}
            >
              <FaSearch />
              <span>Search</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={
                display
                  ? { opacity: 1, width: searchWidth }
                  : { opacity: 0, width: 0 }
              }
              exit={{ opacity: 0, width: 0, x: -50 }} // Exit animation for closing
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 font-bold text-defaultTxt
                sm:mr-4 hover:text-lightColor cursor-pointer border-2 p-1 sm:px-2 rounded-md"
              ref={searchRef}
            >
              <button onClick={handleSearchClick}>
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="What to watch?"
                required
                className="px-1 sm:p-1 w-full bg-transparent
               text-lightColor outline-none border-none"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleSearchClick() : ""
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Second row (Mobile) / Navigation (Desktop) */}
      <div
        className="w-full flex justify-between font-bold text-defaultTxt 
           sm:items-center sm:w-2/12"
      >
        <ul className="w-full flex justify-between">
          <li className={liStyling}>Genre</li>
          <li className={liStyling} onClick={getMovieShow}>
            Movies
          </li>
          <li className={liStyling} onClick={getTvShow}>
            TV Shows
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
