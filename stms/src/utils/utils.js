import { Timestamp } from "firebase/firestore";

const utils = {};

utils.isStaff = (grade) => {
  return (
    grade === "E6" ||
    grade == "E7" ||
    grade == "O1" ||
    grade == "O2" ||
    grade == "O3"
  );
};

utils.getTimeStamp = (time) => {
  const milliSeconds = Math.floor(new Date(time).getTime());
  return Timestamp.fromMillis(milliSeconds);
};

export default utils;
