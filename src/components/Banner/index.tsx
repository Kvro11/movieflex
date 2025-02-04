import { Swiper, SwiperSlide } from "swiper/react";
import StarRatings from "react-star-ratings";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";

const Banner = ({ state }: any) => {
  console.log(`@@@ BANNER: `, state);
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
  const posterSize = "w1280"; // Choose a size
  return (
    // <div className="h-4/5 flex justify-center items-center">
    <Swiper
      centeredSlides={false}
      loop={state.popularList?.length > 1} // Enable loop only if there's more than 1 slide
      loopAdditionalSlides={3} // Helps improve looping by duplicating slides
      grabCursor={false}
      slidesPerView={1}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      modules={[EffectCoverflow, Autoplay]}
      autoplay={{
        delay: 9000, // Time delay for each slide (in milliseconds)
        disableOnInteraction: false, // Allows autoplay to continue after interaction
        pauseOnMouseEnter: true, // Pauses autoplay when mouse is hovering over the swiper
      }}
      // effect="coverflow" // Enable the coverflow effect
      coverflowEffect={{
        rotate: 50, // How much the slides rotate
        stretch: 0, // The amount of "stretch" on the slides
        depth: 100, // Depth of the 3D effect
        modifier: 1, // Strength of the effect
      }}
      className="swiper-container"
    >
      {state.popularList?.slice(0, 10)?.map((popular: any) => (
        <SwiperSlide key={popular.id} className="slide-container">
          <img
            src={`${BASE_IMAGE_URL}${posterSize}${popular.backdrop_path}`}
            alt="Poster Image"
            className="rounded-2xl"
          />
          <div className="info-wrap text-lightColor">
            <h2 className="text-xl sm:text-6xl font-black">{popular.title}</h2>
            <span className="font-bold">{popular.overview}</span>
            <div className="star">
              <StarRatings
                rating={popular.vote_average}
                starRatedColor="yellow"
                numberOfStars={10}
                name="rating"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    // </div>
  );
};

export default Banner;
