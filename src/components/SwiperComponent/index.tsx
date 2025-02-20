import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";

import NoImage from "../Placeholder/NoImage";
import moreGif from "../../assets/more.gif";
import {
  SwiperComponentType,
  DataListType,
} from "../../types/SwiperComponentType";

const SwiperComponent = ({
  movies,
  apiType,
  fetchMoreShow,
}: SwiperComponentType) => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
  const posterSize = "w300"; // Choose a size
  const dataList = movies.results;
  const maxSlides = 19;

  return (
    <Swiper
      centeredSlides={false}
      loop={false}
      grabCursor={true}
      slidesPerView={"auto"}
      spaceBetween={0}
      className="swiperContainer"
    >
      {dataList
        ?.slice(0, maxSlides)
        .map(({ poster_path, id, name, title }: DataListType) => (
          <SwiperSlide className="swiperSlide" key={id}>
            {poster_path ? (
              <img
                src={`${BASE_IMAGE_URL}${posterSize}${poster_path}`}
                alt={name || "Poster Image"}
                loading="lazy"
              />
            ) : (
              <NoImage title={name || title} />
            )}
          </SwiperSlide>
        ))}
      <SwiperSlide className="swiperSlide">
        <div
          className="w-full h-full bg-lightColor 
        rounded-md flex flex-col justify-center items-center
        gap-3 cursor-pointer"
          onClick={() => fetchMoreShow(apiType)}
        >
          <img src={moreGif} alt="movie animation" className="moreGif" />
          <span className="sm:text-2xl hover:text-red-700">+ more</span>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
