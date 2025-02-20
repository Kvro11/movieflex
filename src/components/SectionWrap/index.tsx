import SwiperComponent from "../SwiperComponent";
import { MovieType } from "../../types/SwiperComponentType";

interface SectionWrapProps {
  name: string;
  dataList: MovieType;
  apiType: string;
  fetchMoreShow: any;
}

const SectionWrap: React.FC<SectionWrapProps> = ({
  name,
  dataList,
  apiType,
  fetchMoreShow,
}) => {
  if (!dataList.results || dataList.results?.length === 0) return null; // Skip empty lists

  return (
    <section
      key={name}
      className="flex flex-col gap-4 border-2 sm:p-5 p-2 relative z-10 rounded-xl"
    >
      <span className="sm:text-2xl px-2 text-lightColor font-bold absolute -top-5 z-11 bg-black">
        {name}
      </span>
      <SwiperComponent
        movies={dataList}
        apiType={apiType}
        fetchMoreShow={fetchMoreShow}
      />
    </section>
  );
};

export default SectionWrap;
