import { Swiper, SwiperSlide } from "swiper/react";
import StarRatings from "react-star-ratings";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "./index.css";

interface BannerItemType {
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id: number;
}

interface ApiResponse {
  results: BannerItemType[];
}

const Banner = ({ state }: { state: ApiResponse }) => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
  const posterSize = "w1280"; // Choose a size
  const dataList = state.results;
  const maxSlide = 10;

  return (
    <Swiper
      centeredSlides={false}
      loop={dataList?.length > 1}
      loopAdditionalSlides={3}
      grabCursor={false}
      slidesPerView={1}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      modules={[EffectCoverflow, Autoplay]}
      autoplay={{
        delay: 9000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
      }}
      className="swiper-container"
    >
      {dataList
        ?.slice(0, maxSlide)
        .map(
          ({
            backdrop_path,
            title,
            overview,
            vote_average,
            id,
          }: BannerItemType) => (
            <SwiperSlide key={id} className="slide-container">
              <img
                src={`${BASE_IMAGE_URL}${posterSize}${backdrop_path}`}
                alt="Poster Image"
                className="rounded-2xl"
              />
              <div className="info-wrap text-lightColor">
                <h2 className="text-xl sm:text-6xl font-black">{title}</h2>
                <span className="font-bold">{overview}</span>
                <div className="star">
                  <StarRatings
                    rating={vote_average}
                    starRatedColor="yellow"
                    numberOfStars={10}
                    name="rating"
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        )}
    </Swiper>
  );
};

export default Banner;
