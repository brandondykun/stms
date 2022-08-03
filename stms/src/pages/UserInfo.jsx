import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import apiCalls from "../api/apiUtils";

const UserInfo = () => {
  const [user, setUser] = useState();

  const { id } = useParams();

  useEffect(() => {
    apiCalls
      .getUser(id)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="primary-content">
      {user && (
        <div>
          <div>First Name: {user.first_name}</div>
          <div>Middle Name: {user.middle_name}</div>
          <div>Last Name: {user.last_name}</div>
          <div>Rank: {user.rank}</div>
          <div>Grade: {user.grade}</div>
          <div>Section: {user.section}</div>
          <div>Team: {user.team}</div>
          <div>Role: {user.role}</div>
          <div>ACFT Score: {user.acft_score}</div>
          <div>M4 Qual Score: {user.m4_qual}</div>
          <div>DLC 1 Complete: {user.dlc_1_complete ? "Yes" : "No"}</div>
          <div>BLC Complete: {user.blc_complete ? "Yes" : "No"}</div>
          <div>DLC 2 Complete: {user.dlc_2_complete ? "Yes" : "No"}</div>
          <div>ALC Complete: {user.alc_complete ? "Yes" : "No"}</div>
          <div>DLC 3 Complete: {user.dlc_3_complete ? "Yes" : "No"}</div>
          <div>SLC Complete: {user.slc_complete ? "Yes" : "No"}</div>
          <div>JFO Qualified: {user.jfo_qualified ? "Yes" : "No"}</div>
          <div>Drivers License: {user.drivers_license ? "Yes" : "No"}</div>

          {/* need to figure out hoe to display the dates */}
          {/* <div>{user.pebd}</div>
          <div>{user.dor}</div>
          <div>{user.ets}</div> */}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
