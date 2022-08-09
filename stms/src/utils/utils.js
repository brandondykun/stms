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
  if (user.role == "BN FSO") {
    return 1;
  } else if (user.role == "BN FSNCO") {
    return 2;
  } else if (user.role == "BN FO") {
    return 3;
  } else if (user.role == "AFATDS") {
    return 4;
  } else if (user.role == "BN RTO") {
    return 5;
  } else if (user.section == "ALPHA" && user.role == "CO FSO") {
    return 10;
  } else if (user.section == "ALPHA" && user.role == "CO FSNCO") {
    return 11;
  } else if (user.section == "ALPHA" && user.role == "FO" && user.team == "1") {
    return 12;
  } else if (
    user.section == "ALPHA" &&
    user.role == "RTO" &&
    user.team == "1"
  ) {
    return 13;
  } else if (user.section == "ALPHA" && user.role == "FO" && user.team == "2") {
    return 14;
  } else if (
    user.section == "ALPHA" &&
    user.role == "RTO" &&
    user.team == "2"
  ) {
    return 15;
  } else if (user.section == "ALPHA" && user.role == "FO" && user.team == "3") {
    return 16;
  } else if (
    user.section == "ALPHA" &&
    user.role == "RTO" &&
    user.team == "3"
  ) {
    return 17;
  } else if (user.section == "BRAVO" && user.role == "CO FSO") {
    return 20;
  } else if (user.section == "BRAVO" && user.role == "CO FSNCO") {
    return 21;
  } else if (user.section == "BRAVO" && user.role == "FO" && user.team == "1") {
    return 22;
  } else if (
    user.section == "BRAVO" &&
    user.role == "RTO" &&
    user.team == "1"
  ) {
    return 23;
  } else if (user.section == "BRAVO" && user.role == "FO" && user.team == "2") {
    return 24;
  } else if (
    user.section == "BRAVO" &&
    user.role == "RTO" &&
    user.team == "2"
  ) {
    return 25;
  } else if (user.section == "BRAVO" && user.role == "FO" && user.team == "3") {
    return 26;
  } else if (
    user.section == "BRAVO" &&
    user.role == "RTO" &&
    user.team == "3"
  ) {
    return 27;
  } else if (user.section == "CHARLIE" && user.role == "CO FSO") {
    return 30;
  } else if (user.section == "CHARLIE" && user.role == "CO FSNCO") {
    return 31;
  } else if (
    user.section == "CHARLIE" &&
    user.role == "FO" &&
    user.team == "1"
  ) {
    return 32;
  } else if (
    user.section == "CHARLIE" &&
    user.role == "RTO" &&
    user.team == "1"
  ) {
    return 33;
  } else if (
    user.section == "CHARLIE" &&
    user.role == "FO" &&
    user.team == "2"
  ) {
    return 34;
  } else if (
    user.section == "CHARLIE" &&
    user.role == "RTO" &&
    user.team == "2"
  ) {
    return 35;
  } else if (
    user.section == "CHARLIE" &&
    user.role == "FO" &&
    user.team == "3"
  ) {
    return 36;
  } else if (
    user.section == "CHARLIE" &&
    user.role == "RTO" &&
    user.team == "3"
  ) {
    return 37;
  } else if (user.section == "DELTA" && user.role == "CO FSO") {
    return 40;
  } else if (user.section == "DELTA" && user.role == "CO FSNCO") {
    return 41;
  } else if (user.section == "DELTA" && user.role == "FO" && user.team == "1") {
    return 42;
  } else if (
    user.section == "DELTA" &&
    user.role == "RTO" &&
    user.team == "1"
  ) {
    return 43;
  } else if (user.section == "DELTA" && user.role == "FO" && user.team == "2") {
    return 44;
  } else if (
    user.section == "DELTA" &&
    user.role == "RTO" &&
    user.team == "2"
  ) {
    return 45;
  } else if (user.section == "DELTA" && user.role == "FO" && user.team == "3") {
    return 46;
  } else if (
    user.section == "DELTA" &&
    user.role == "RTO" &&
    user.team == "3"
  ) {
    return 47;
  } else return 50;
};

export default utils;
