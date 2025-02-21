import { TbMovie } from "react-icons/tb";

type NoImageProps = {
  title?: string;
};

const NoImage = ({ title = "No Title Available" }: NoImageProps) => {
  return (
    <div
      className="aspect-[2/3] h-full object-cover rounded-md bg-white 
        flex flex-col justify-center items-center gap-5 px-2"
    >
      <TbMovie className="text-primaryColor text-8xl" />
      <span className="sm:text-xl text-primaryColor text-center">{title}</span>
    </div>
  );
};
export default NoImage;
