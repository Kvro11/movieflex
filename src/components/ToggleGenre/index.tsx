import { useEffect } from "react";

import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ToggleGenre = ({
  isNavOpen,
  toggleGenre,
  onGenreSelect,
  genreList,
}: any) => {
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isNavOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={
        isNavOpen ? { opacity: 1, height: "100vh" } : { opacity: 0, height: 0 }
      }
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-90 overflow-hidden 
      flex justify-center items-center"
    >
      <button
        onClick={toggleGenre}
        className="absolute right-5 top-4 text-4xl font-bold"
      >
        <IoMdClose />
      </button>
      <ul
        className="flex flex-col items-center gap-10 h-90 w-full
        overflow-y-auto custom-scrollbar pb-10"
      >
        {genreList.genres?.map((genre: { id: number; name: string }) => (
          <li
            key={genre.id}
            className="cursor-pointer hover:text-gray-300 hover:underline text-2xl"
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ToggleGenre;
