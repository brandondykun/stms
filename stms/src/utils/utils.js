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

// Twelve hours in milliseconds
const TWELVE_HRS_MIL_SEC = 43200000;

utils.getTimeStamp = (time) => {
  let outputTime;
  if (typeof time === "string") {
    // This is a new date input represented as a string.
    // It represents the time at midnight GMT on the input date.
    // This must be converted to Noon GMT by adding 12 hours.
    const milliSecs = new Date(time).getTime();
    // Get Noon GMT time on given date.
    outputTime = milliSecs + TWELVE_HRS_MIL_SEC;
  } else {
    // If input time is an object, it will already have been converted to a
    // local date with the correct timezone attached. This will occur when a form
    // is submitted without having changed the date field.
    outputTime = new Date(time).getTime();
  }
  return Timestamp.fromMillis(outputTime);
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

utils.dlcIncomplete = (user) => {
  if (user.grade === "E4" && !user.dlc_1_complete) return true;
  if (user.grade === "E5" && !user.dlc_2_complete) return true;
  if (user.grade === "E6" && !user.dlc_3_complete) return true;
  return false;
};

utils.pmeIncomplete = (user) => {
  if (user.grade === "E4" && user.dlc_1_complete && !user.blc_complete)
    return true;
  if (user.grade === "E5" && user.dlc_2_complete && !user.alc_complete)
    return true;
  if (user.grade === "E6" && user.dlc_3_complete && !user.slc_complete)
    return true;
  return false;
};

utils.getFormattedStringFromDays = (numberOfDays) => {
  const years = Math.floor(numberOfDays / 365);
  const months = Math.floor((numberOfDays % 365) / 30);
  const days = Math.floor((numberOfDays % 365) % 30);
  let message = "";

  if (years) message += `${years}yr`;
  if (months) message += ` ${months}mo`;
  if (days) message += ` ${days}d`;

  return message;
};

export default utils;
