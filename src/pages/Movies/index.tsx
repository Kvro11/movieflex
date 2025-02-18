import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchShowList } from "../../state/CatalogSlice";
import { AppDispatch, RootState } from "../../state/store";

import CatalogList from "../../components/SectionWrap/CatalogList";

const MovieShow = () => {
  const state = useSelector((state: RootState) => state.catalog?.movieShow);
  const movieGenreState = useSelector(
    (state: RootState) => state.genreList?.movieGenreList
  );

  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleGenre = () => {
    setIsNavOpen((prev) => !prev);
  };

  const onGenreSelect = (genreId: number) => {
    dispatch(
      fetchShowList({ apiType: "movieCatalog", page: 1, genreId: genreId })
    );
    setIsNavOpen((prev) => !prev);
  };

  const fetchMoreTVShow = () => {
    const nextPage = page + 1;
    dispatch(fetchShowList({ apiType: "movieCatalog", page: nextPage }));
    setPage(nextPage);
  };

  useEffect(() => {
    dispatch(fetchShowList({ apiType: "movieCatalog", page }));
  }, [dispatch]);

  return (
    <div className="h-fit text-lightColor relative">
      <CatalogList
        title={"Movie Show"}
        toggleGenre={toggleGenre}
        fetchMoreShow={fetchMoreTVShow}
        onGenreSelect={onGenreSelect}
        isNavOpen={isNavOpen}
        state={state}
        genreState={movieGenreState}
      />
    </div>
  );
};
export default MovieShow;
