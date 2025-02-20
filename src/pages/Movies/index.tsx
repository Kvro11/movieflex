import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchShowList } from "../../state/CatalogSlice";
import { AppDispatch, RootState } from "../../state/store";

import CatalogList from "../../components/SectionWrap/CatalogList";

const MovieShow = () => {
  const dataList = useSelector((state: RootState) => state.catalog?.movieShow);
  const movieGenreState = useSelector(
    (state: RootState) => state.genreList?.movieGenreList
  );

  const dispatch = useDispatch<AppDispatch>();

  const [genre, setGenre] = useState<number | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleGenre = () => {
    setIsNavOpen((prev) => !prev);
  };

  const onGenreSelect = (genreId: number) => {
    dispatch(
      fetchShowList({ apiType: "movieCatalog", page: 1, genreId: genreId })
    );
    setGenre(genreId);
    setIsNavOpen(false);
  };

  const fetchMoreTVShow = (nextPage: number) => {
    dispatch(
      fetchShowList({
        apiType: "movieCatalog",
        page: nextPage,
        genreId: genre ?? undefined,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchShowList({ apiType: "movieCatalog", page: 1 }));
  }, [dispatch]);

  return (
    <div className="h-fit text-lightColor relative">
      <CatalogList
        title={"Movie Show"}
        toggleGenre={toggleGenre}
        fetchMoreShow={fetchMoreTVShow}
        onGenreSelect={onGenreSelect}
        isNavOpen={isNavOpen}
        dataList={dataList}
        genreState={movieGenreState}
      />
    </div>
  );
};
export default MovieShow;
