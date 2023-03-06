import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

const utils = {};

utils.isStaff = (role) => {
  return (
    // grade === "E6" ||
    // grade == "E7" ||
    // grade == "O1" ||
    // grade == "O2" ||
    // grade == "O3"
    role == "BN FSO" ||
    role == "BN FSNCO" ||
    role == "CO FSO" ||
    role == "CO FSNCO"
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
  if (user.rank === "CDT") return false;
  if (user.grade === "E4" && !user.dlc_1_complete) return true;
  if (user.grade === "E5" && !user.dlc_2_complete) return true;
  if (user.grade === "E6" && !user.dlc_3_complete) return true;
  return false;
};

utils.pmeIncomplete = (user) => {
  if (user.rank === "CDT") return false;
  if (user.grade === "E4" && user.dlc_1_complete && !user.blc_complete)
    return true;
  if (user.grade === "E5" && user.dlc_2_complete && !user.alc_complete)
    return true;
  if (user.grade === "E6" && user.dlc_3_complete && !user.slc_complete)
    return true;
  return false;
};

utils.getFormattedStringFromDays = (numberOfDays) => {
  let years = Math.floor(numberOfDays / 365);
  let months = Math.floor((numberOfDays % 365) / 30);
  let days = Math.floor((numberOfDays % 365) % 30);
  let message = "";

  // if past ETS add a year so it doesn't start at 1 year
  if (numberOfDays < 0) years = years + 1;

  // if past ETS date, make the years positive not negative
  if (years) {
    if (years < 0) {
      years = years * -1;
    }
    message += `${years}yr`;
  }
  // if past ETS date, make the months positive not negative
  if (months) {
    if (months < 0) {
      months = months * -1;
    }
    message += ` ${months}mo`;
  }
  // if past ETS date, make the days positive not negative
  if (days) {
    if (days < 0) {
      days = days * -1;
    }
    message += ` ${days}d`;
  }

  return message;
};

utils.isPromotable = (user) => {
  if (user.rank === "CDT") return false;
  const payEntryBaseDate = dayjs(user.pebd.seconds * 1000);
  const dateOfRank = dayjs(user.dor.seconds * 1000);
  const now = dayjs();
  const timeInService = now.diff(payEntryBaseDate, "month");
  const timeInGrade = now.diff(dateOfRank, "month");
  const blcComplete = user.blc_complete;
  const dlcOneComplete = user.dlc_1_complete;
  const dlcTwoComplete = user.dlc_2_complete;
  const dlcThreeComplete = user.dlc_3_complete;

  if (!user.acft_pass) return false;
  if (user.grade === "E1") {
    if (timeInService > 6) return true;
  } else if (user.grade === "E2") {
    if (timeInService >= 12 && timeInGrade >= 4) return true;
  } else if (user.grade === "E3") {
    if (timeInService >= 24 && timeInGrade >= 6) return true;
  } else if (user.grade === "E4") {
    if (
      (dlcOneComplete && blcComplete) ||
      (timeInService >= 36 && timeInGrade >= 12 && dlcOneComplete)
    )
      return true;
  } else if (user.grade === "E5") {
    if (timeInService >= 72 && timeInGrade >= 18 && dlcTwoComplete) return true;
  } else if (user.grade === "E6") {
    if (timeInService >= 72 && timeInGrade >= 36 && dlcThreeComplete)
      return true;
  }
};

export default utils;
