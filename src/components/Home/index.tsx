import SectionWrap from "../SectionWrap/index";

const Home = ({ state }: any) => {
  const popularList = state.popularList;
  const topRated = state.topRatedList;
  const kdrama = state.kdramaList;
  const anime = state.animeList;

  const movieList = [
    { type: "Popular Movies", list: popularList },
    { type: "Top Rated Movies", list: topRated },
    { type: "Kdrama", list: kdrama },
    { type: "Anime", list: anime },
  ];
  return (
    <div className="py-5 px-3  sm:p-12 flex flex-col gap-10 mt-5 sm:mt-0">
      {movieList.map((movie: { type: string; list: any[] }, index) => (
        // sectionWrap(movie.type, movie.list)
        <SectionWrap name={movie.type} dataList={movie.list} key={index} />
      ))}
    </div>
  );
};
export default Home;
