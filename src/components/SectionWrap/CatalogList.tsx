import { useNavigate } from "react-router-dom";

import ToggleGenre from "../../components/ToggleGenre";
import { CatalogListProps } from "../../types/CatalogTypes";
import InfiniteScrolling from "../infiniteScrolling";

import { FaArrowLeftLong } from "react-icons/fa6";

const CatalogList: React.FC<CatalogListProps> = ({
  title,
  toggleGenre,
  fetchMoreShow,
  onGenreSelect,
  isNavOpen,
  genreState,
  dataList,
}: any) => {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-16 sm:h-20 p-5 sm:px-12 py-5 flex items-center justify-between">
        <FaArrowLeftLong
          className="text-3xl hover:text-white transition ease-in-out duration-200 hover:scale-90"
          onClick={handleBackBtn}
        />
        <h2 className="text-xl sm:text-3xl font-bold">{title}</h2>
        <button
          onClick={toggleGenre}
          className={`${
            isNavOpen ? "text-black" : "text-lightColor"
          } sm:text-2xl`}
        >
          Genre
        </button>
        <ToggleGenre
          isNavOpen={isNavOpen}
          toggleGenre={toggleGenre}
          genreList={genreState}
          onGenreSelect={onGenreSelect}
        />
      </div>
      <InfiniteScrolling fetchMore={fetchMoreShow} dataList={dataList} />
    </>
  );
};

export default CatalogList;
