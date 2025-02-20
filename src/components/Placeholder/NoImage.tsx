import { TbMovie } from "react-icons/tb";

type NoImageProps = {
  title?: string; // Optional in case title is not provided
};

const NoImage = ({ title = "No Title Available" }: NoImageProps) => {
  return (
    <div
      className="h-full object-cover rounded-md bg-white 
        flex flex-col justify-center items-center gap-5 px-2"
    >
      <TbMovie className="text-primaryColor text-8xl" />
      <span className="sm:text-xl text-primaryColor text-center">{title}</span>
    </div>
  );
};
export default NoImage;
