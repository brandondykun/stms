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

  const pebd = new Date(user?.pebd.seconds * 1000);
  const dor = new Date(user?.dor.seconds * 1000);
  const ets = new Date(user?.ets.seconds * 1000);

  return (
    <div className="primary-content">
      {user && (
        <div className="user-info-container">
          <h1 className="page-title">
            {user.rank} {user.last_name}
          </h1>
          <div className="sections-row">
            <div className="section-container info-container">
              <h2 className="section-title info-title">Name/Rank</h2>
              <div>First Name: {user.first_name}</div>
              <div>Middle Name: {user.middle_name}</div>
              <div>Last Name: {user.last_name}</div>
              <div>Rank: {user.rank}</div>
              <div>Grade: {user.grade}</div>
            </div>
            <div className="section-container info-container">
              <h2 className="section-title info-title">Assignment/Certs</h2>
              <div>Section: {user.section}</div>
              <div>Team: {user.team}</div>
              <div>Role: {user.role}</div>
              <div>JFO Qualified: {user.jfo_qualified ? "Yes" : "No"}</div>
              <div>Drivers License: {user.drivers_license ? "Yes" : "No"}</div>
            </div>
          </div>
          <div className="sections-row">
            <div className="section-container info-container">
              <h2 className="section-title info-title">Dates/Scores</h2>
              <div>PEBD: {pebd.toLocaleDateString()}</div>
              <div>DOR: {dor.toLocaleDateString()}</div>
              <div>ETS: {ets.toLocaleDateString()}</div>
              <div>ACFT Score: {user.acft_score}</div>
              <div>M4 Qual Score: {user.m4_qual}</div>
            </div>
            <div className="section-container info-container">
              <h2 className="section-title info-title">Military Education</h2>
              <div>DLC 1 Complete: {user.dlc_1_complete ? "Yes" : "No"}</div>
              <div>BLC Complete: {user.blc_complete ? "Yes" : "No"}</div>
              <div>DLC 2 Complete: {user.dlc_2_complete ? "Yes" : "No"}</div>
              <div>ALC Complete: {user.alc_complete ? "Yes" : "No"}</div>
              <div>DLC 3 Complete: {user.dlc_3_complete ? "Yes" : "No"}</div>
              <div>SLC Complete: {user.slc_complete ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
