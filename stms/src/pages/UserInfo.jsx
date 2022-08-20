import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faAnglesRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utils from "../utils/utils";

const UserInfo = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { accountInfo } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    apiCalls
      .getUser(id)
      .then((user) => {
        if (user.found) {
          setUser(user.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const etsDate = dayjs(user?.ets.seconds * 1000);
  const dateOfRank = dayjs(user?.dor.seconds * 1000);
  const payEntryBaseDate = dayjs(user?.pebd.seconds * 1000);

  const now = dayjs();
  const etsDiff = etsDate?.diff(now, "day");
  const timeInGrade = now?.diff(dateOfRank, "day");
  const timeInService = now?.diff(payEntryBaseDate, "day");

  const formattedEtsDiff = utils.getFormattedStringFromDays(etsDiff);
  const formattedTimeInService =
    utils.getFormattedStringFromDays(timeInService);
  const formattedTimeInGrade = utils.getFormattedStringFromDays(timeInGrade);

  return (
    <div className="primary-content">
      {!loading && (
        <div className="user-info-container">
          <div className="title-link-container">
            <h1 className="page-title name-title">
              {user.rank} {user.last_name}
            </h1>
            {(accountInfo?.is_staff || accountInfo?.id === id) && (
              <Link to={`/comments/${id}`} className="comments-link">
                View Comments
                <span className="icon-margin-left">
                  <FontAwesomeIcon icon={faAnglesRight} />
                </span>
              </Link>
            )}
          </div>
          {(accountInfo?.is_staff || accountInfo?.id === id) && (
            <Link
              to={`/user-info/${id}/edit`}
              className="comments-link fit-link inline"
            >
              <div className="edit-button-container">
                Edit Info
                <span className="icon-margin-left">
                  <FontAwesomeIcon icon={faPen} size="xs" />
                </span>
              </div>
            </Link>
          )}
          <div className="sections-row">
            <div className="section-container info-container">
              <h2 className="section-title info-title">Name/Rank</h2>
              <div>First Name: {user.first_name}</div>
              <div>Middle Name: {user.middle_name}</div>
              <div>Last Name: {user.last_name}</div>
              <div>Rank: {user.rank}</div>
              <div>Grade: {user.grade}</div>
              <div>JFO Qualified: {user.jfo_qualified ? "Yes" : "No"}</div>
            </div>
            <div className="section-container info-container">
              <h2 className="section-title info-title">Assignment/Scores</h2>
              <div>Section: {user.section}</div>
              <div>Team: {user.team}</div>
              <div>Role: {user.role}</div>
              <div>ACFT Score: {user.acft_score}</div>
              <div>ACFT Pass: {user.acft_pass ? "Yes" : "No"}</div>
              <div>M4 Qual Score: {user.m4_qual}</div>
            </div>
          </div>
          <div className="sections-row">
            <div className="section-container info-container">
              <h2 className="section-title info-title">Dates</h2>
              <div>PEBD: {payEntryBaseDate.format("MM/DD/YYYY")}</div>
              <div>TIS: {formattedTimeInService}</div>
              <div>DOR: {dateOfRank.format("MM/DD/YYYY")}</div>
              <div>TIG: {formattedTimeInGrade}</div>
              <div>ETS: {etsDate.format("MM/DD/YYYY")}</div>
              <div>ETS In: {formattedEtsDiff}</div>
            </div>
            <div className="section-container info-container">
              <h2 className="section-title info-title">Military Education</h2>
              <div>DLC 1 Complete: {user.dlc_1_complete ? "Yes" : "No"}</div>
              <div>BLC Complete: {user.blc_complete ? "Yes" : "No"}</div>
              <div>DLC 2 Complete: {user.dlc_2_complete ? "Yes" : "No"}</div>
              <div>ALC Complete: {user.alc_complete ? "Yes" : "No"}</div>
              <div>DLC 3 Complete: {user.dlc_3_complete ? "Yes" : "No"}</div>
              <div>SLC Complete: {user.slc_complete ? "Yes" : "No"}</div>
              <div>Drivers License: {user.drivers_license ? "Yes" : "No"}</div>
            </div>
          </div>
          <div className="sections-row">
            <div className="section-container info-container">
              <div className="flex flex-space-between flex-align-center underline-white margin-b-05">
                <h2 className="font-size-md color-gold">Scheduled Schools</h2>
                {(accountInfo?.is_staff || accountInfo?.id === id) && (
                  <Link to={`/user-info/${id}/add-school`}>
                    <div className="color-white italic hover-gold hover-underline">
                      Add
                      <span className="icon-margin-left">
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                      </span>
                    </div>
                  </Link>
                )}
              </div>
              {user?.schools.length > 0 ? (
                user.schools.map((school, index) => {
                  const startDate = dayjs(school.start_date.seconds * 1000);
                  const endDate = dayjs(school.end_date.seconds * 1000);
                  return (
                    <div key={index} className="school-list-item">
                      <div>{school.school_name}</div>
                      <div>{startDate.format("MM/DD/YYYY")} -</div>
                      <div>{endDate.format("MM/DD/YYYY")}</div>
                    </div>
                  );
                })
              ) : (
                <div>No scheduled schools</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
