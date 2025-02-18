import loading from "../../assets/loading.svg";

const Loading = () => {
  return (
    <div
      className="w-full h-85vh bg-black opacity-95  flex 
       justify-center items-center"
    >
      <img src={loading} alt="loading" className="h-1/5" />
    </div>
  );
};

export default Loading;
