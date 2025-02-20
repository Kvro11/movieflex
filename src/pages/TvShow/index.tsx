import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchShowList } from "../../state/CatalogSlice";
import { AppDispatch, RootState } from "../../state/store";

import CatalogList from "../../components/SectionWrap/CatalogList";

const TvShow = () => {
  const dataList = useSelector((state: RootState) => state.catalog?.tvShow);

  const tvGenreState = useSelector(
    (state: RootState) => state.genreList.tvGenreList
  );
  const dispatch = useDispatch<AppDispatch>();

  const [genre, setGenre] = useState<number | null>(null);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleGenre = () => {
    setIsNavOpen((prev) => !prev);
  };

  const onGenreSelect = (genreId: number | null) => {
    setGenre(genreId);
    dispatch(fetchShowList({ apiType: "tvCatalog", page: 1, genreId }));
    setIsNavOpen(false);
  };

  const fetchMoreTVShow = (nextPage: number) => {
    dispatch(
      fetchShowList({
        apiType: "tvCatalog",
        page: nextPage,
        genreId: genre ?? undefined,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchShowList({ apiType: "tvCatalog", page: 1, genreId: genre }));
  }, [dispatch]);

  return (
    <div className="h-fit text-lightColor relative">
      <CatalogList
        title={"TV Show"}
        toggleGenre={toggleGenre}
        fetchMoreShow={fetchMoreTVShow}
        isNavOpen={isNavOpen}
        dataList={dataList}
        genreState={tvGenreState}
        onGenreSelect={onGenreSelect}
      />
    </div>
  );
};
export default TvShow;
