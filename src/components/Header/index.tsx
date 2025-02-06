import { useNavigate } from "react-router-dom";

import { PiGitlabLogoFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const liStyling =
    "hover:text-lightColor cursor-pointer border-2 px-5 rounded-lg sm:px-0 sm:border-0";

  const getTvShow = () => {
    navigate("/tv-show"); // Navigate only after fetching is done
  };

  return (
    <div
      className="h-fit p-5 flex flex-col sm:flex-row sm:items-center 
      sm:justify-between gap-5 sm:px-12 sm:py-4 bg-primaryColor text-lightColor"
    >
      {/* First row: Logo & Search */}
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-1 sm:gap-3">
          <span className="text-5xl sm:text-6xl">
            <PiGitlabLogoFill />
          </span>
          <h1 className="text-xl font-black sm:text-4xl">MovieFlex</h1>
        </div>
        <div
          className="flex items-center gap-2 font-bold text-defaultTxt
           sm:mr-4 hover:text-lightColor cursor-pointer"
        >
          <FaSearch />
          <span>Search</span>
        </div>
      </div>

      {/* Second row (Mobile) / Navigation (Desktop) */}
      <div
        className="w-full flex justify-between font-bold text-defaultTxt 
           sm:items-center sm:w-2/12"
      >
        <ul className="w-full flex justify-between">
          <li className={liStyling}>Genre</li>
          <li className={liStyling}>Movies</li>
          <li className={liStyling} onClick={getTvShow}>
            TV Shows
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
