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

utils.filter = (items, filterValue, value) => {
  const filtered = items.filter((item) => {
    return item[filterValue] === value;
  });
  return filtered;
};

utils.assignUnitPosition = (user) => {
  let position = 0;

  if (user.role == "BN FSO") return 1;
  if (user.role == "BN FSNCO") return 2;
  if (user.role == "BN FO") return 3;
  if (user.role == "AFATDS") return 4;
  if (user.role == "BN RTO") return 5;
  if (user.section === "UNASSIGNED" || user.section === "") return 50;

  if (user.section === "ALPHA") position += 10;
  if (user.section === "BRAVO") position += 20;
  if (user.section === "CHARLIE") position += 30;
  if (user.section === "DELTA") position += 40;

  if (user.team === "1") position += 2;
  if (user.team === "2") position += 4;
  if (user.team === "3") position += 6;

  if (user.role === "CO FSNCO") position += 1;
  if (user.role === "RTO") position += 1;

  return position;
};

export default utils;
