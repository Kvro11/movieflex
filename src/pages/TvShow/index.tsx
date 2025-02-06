import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchTvShow } from "../../state/tvSlice";
import { AppDispatch, RootState } from "../../state/store";
import SectionWrap from "../../components/SectionWrap";

import { FaArrowLeftLong } from "react-icons/fa6";

const TvShow = () => {
  const state = useSelector((state: RootState) => state.tvShow);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate("/");
  };

  const TVShowList = [
    { type: "Popular Show", list: state.popularShow },
    { type: "Top Rated Show", list: state.topRatedShow },
    { type: "Kids Show", list: state.kidsShow },
    { type: "Reality Show", list: state.realityShow },
    { type: "Kdrama", list: state.kdramaShow },
    { type: "Anime", list: state.anime },
  ];

  useEffect(() => {
    dispatch(fetchTvShow({ apiType: "popularShow" }));
    dispatch(fetchTvShow({ apiType: "topRatedShow" }));
    dispatch(fetchTvShow({ apiType: "kdrama" }));
    dispatch(fetchTvShow({ apiType: "kids" }));
    dispatch(fetchTvShow({ apiType: "realityShow" }));
    dispatch(fetchTvShow({ apiType: "anime" }));
  }, [dispatch]);

  return (
    <div className="h-fit text-lightColor">
      <div className="h-16 sm:h-20 p-5 sm:px-12 py-5 flex items-center justify-between">
        <FaArrowLeftLong
          className="text-3xl hover:text-white transition ease-in-out duration-200 hover:scale-90"
          onClick={handleBackBtn}
        />
        <h2 className="text-xl sm:text-3xl font-bold">TV Show</h2>
        <h2 className="text-xl font-bold">Genre</h2>
      </div>
      <div className="px-3 py-5 sm:px-12 sm:pb-12 flex flex-col gap-10">
        {TVShowList.map((show: { type: string; list: any[] }) => (
          <SectionWrap name={show.type} dataList={show.list} />
        ))}
      </div>
    </div>
  );
};
export default TvShow;
