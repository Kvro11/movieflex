import SwiperComponent from "../SwiperComponent";

const Home = ({ state }: any) => {
  const popularList = state.popularList;
  const topRated = state.topRatedList;
  const kdrama = state.kdramaList;
  const anime = state.animeList;

  const sectionWrap = (name: string, movieType: any) => {
    if (!movieType || movieType.length === 0) return null; // Skip empty lists
    return (
      <section className="flex flex-col gap-4 border-2 sm:p-5 p-2 relative z-10 rounded-xl">
        <span className="sm:text-2xl px-2 text-lightColor font-bold absolute -top-5 z-11 bg-black">
          {name}
        </span>
        <SwiperComponent movies={movieType} />
      </section>
    );
  };

  const movieList = [
    { type: "Popular Movies", list: popularList },
    { type: "Top Rated Movies", list: topRated },
    { type: "Kdrama", list: kdrama },
    { type: "Anime", list: anime },
  ];
  return (
    <div className="p-5  sm:p-12 flex flex-col gap-10 mt-5 sm:mt-0">
      {movieList.map((movie: { type: string; list: any[] }) =>
        sectionWrap(movie.type, movie.list)
      )}
    </div>
  );
};
export default Home;
