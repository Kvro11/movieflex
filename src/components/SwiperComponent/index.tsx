import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";

const SwiperComponent = ({ movies }: any) => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
  const posterSize = "w300"; // Choose a size

  return (
    <Swiper
      centeredSlides={false}
      loop={false}
      grabCursor={true}
      slidesPerView={"auto"}
      spaceBetween={0}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        // clickable: true,
      }}
      // modules={[EffectCoverflow, Pagination, Navigation]}
      // onSlideChange={(swiper) => swiper.realIndex + 1}
      // freeMode={true} // Allows natural horizontal scrolling
      className="swiperContainer"
    >
      {movies.map((movie: any) => (
        <SwiperSlide className="swiperSlide" key={movie.id}>
          <img
            src={`${BASE_IMAGE_URL}${posterSize}${movie.poster_path}`}
            alt="Poster Image"
            className="h-full rounded-2xl relative"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
