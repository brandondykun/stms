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

  const pageTitle =
    accountInfo.id === id ? "My Info" : `${user?.rank} ${user?.last_name}`;

  return (
    <div className="primary-content">
      {!loading && (
        <div className="user-info-container">
          <div className="title-link-container">
            <h1 className="page-title name-title">{pageTitle}</h1>
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
                <span id="edit-info-link">Edit Info</span>
                <span className="icon-margin-left">
                  <FontAwesomeIcon icon={faPen} size="xs" />
                </span>
              </div>
            </Link>
          )}
          <div className="sections-row">
            <div className="section-container info-container">
              <h2 id="name-rank-title" className="section-title info-title">
                Name/Rank
              </h2>
              <div data-cy="first-name">First Name: {user.first_name}</div>
              <div data-cy="middle-name">Middle Name: {user.middle_name}</div>
              <div data-cy="last-name">Last Name: {user.last_name}</div>
              <div data-cy="rank">Rank: {user.rank}</div>
              <div data-cy="grade">Grade: {user.grade}</div>
              <div data-cy="jfo">
                JFO Qualified: {user.jfo_qualified ? "Yes" : "No"}
              </div>
            </div>
            <div className="section-container info-container">
              <h2
                id="assignment-scores-title"
                className="section-title info-title"
              >
                Assignment/Scores
              </h2>
              <div data-cy="section">Section: {user.section}</div>
              <div data-cy="team">Team: {user.team}</div>
              <div data-cy="role">Role: {user.role}</div>
              <div data-cy="acft-score">ACFT Score: {user.acft_score}</div>
              <div data-cy="acft-pass">
                ACFT Pass: {user.acft_pass ? "Yes" : "No"}
              </div>
              <div data-cy="m4-score">M4 Qual Score: {user.m4_qual}</div>
            </div>
          </div>
          <div className="sections-row">
            <div className="section-container info-container">
              <h2 id="dates-title" className="section-title info-title">
                Dates
              </h2>
              <div data-cy="pebd">
                PEBD: {payEntryBaseDate.format("MM/DD/YYYY")}
              </div>
              <div data-cy="tis">TIS: {formattedTimeInService}</div>
              <div data-cy="dor">DOR: {dateOfRank.format("MM/DD/YYYY")}</div>
              <div data-cy="tig">TIG: {formattedTimeInGrade}</div>
              <div data-cy="ets">ETS: {etsDate.format("MM/DD/YYYY")}</div>
              <div data-cy="ets-in">ETS In: {formattedEtsDiff}</div>
            </div>
            <div className="section-container info-container">
              <h2 id="education-title" className="section-title info-title">
                Military Education
              </h2>
              <div data-cy="dlc-1">
                DLC 1 Complete: {user.dlc_1_complete ? "Yes" : "No"}
              </div>
              <div data-cy="blc">
                BLC Complete: {user.blc_complete ? "Yes" : "No"}
              </div>
              <div data-cy="dlc-2">
                DLC 2 Complete: {user.dlc_2_complete ? "Yes" : "No"}
              </div>
              <div data-cy="alc">
                ALC Complete: {user.alc_complete ? "Yes" : "No"}
              </div>
              <div data-cy="dlc-3">
                DLC 3 Complete: {user.dlc_3_complete ? "Yes" : "No"}
              </div>
              <div data-cy="slc">
                SLC Complete: {user.slc_complete ? "Yes" : "No"}
              </div>
              <div data-cy="license">
                Drivers License: {user.drivers_license ? "Yes" : "No"}
              </div>
            </div>
          </div>
          <div className="sections-row">
            <div className="section-container info-container">
              <div className="flex flex-space-between flex-align-center underline-white margin-b-05">
                <h2 id="schools-title" className="font-size-md color-gold">
                  Scheduled Schools
                </h2>
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
                user.schools
                  .sort((a, b) => a.start_date.seconds - b.start_date.seconds)
                  .map((school) => {
                    const startDate = dayjs(school.start_date.seconds * 1000);
                    const endDate = dayjs(school.end_date.seconds * 1000);
                    return (
                      <div
                        className="school-list-item flex-space-between padding-tb-05 color-white"
                        key={school.id}
                      >
                        <div>{school.school_name}</div>
                        <div>
                          {startDate.format("MM/DD")} -{" "}
                          {endDate.format("MM/DD/YYYY")}
                          {(accountInfo?.is_staff ||
                            accountInfo?.id === id) && (
                            <Link
                              to={`/user-info/${id}/edit-school/${school.id}`}
                              className="color-white hover-gold "
                            >
                              <span className="icon-margin-left">
                                <FontAwesomeIcon icon={faPen} size="xs" />
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="color-dark-placeholder">
                  No scheduled schools
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
