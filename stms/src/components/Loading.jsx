import BeatLoader from "react-spinners/BeatLoader";

const Loading = ({ pending }) => {
  return (
    <div className="loading-screen">
      <BeatLoader color={"#FEC30A"} loading={pending} size={20} />
    </div>
  );
};

export default Loading;
