import { useState } from "react";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";
import SectionContainer from "../components/SectionContainer";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await apiCalls.getAllUsers();
      if (!res.error) {
        setAllUsers(res);
        console.log("RES: ", res);
      } else {
        console.log("Error", res.error);
        // handle this error
      }
    };
    getUsers();
  }, []);

  return (
    <div className="primary-content">
      <h1 className="page-title">Section Overview</h1>
      <div className="image-wrapper">
        <img
          className="image-container small-image"
          src="../src/assets/fist-logo.png"
          alt="FIST logo"
        />
      </div>
      <div className="sections-container">
        <div className="sections-row">
          <SectionContainer users={allUsers} section={"BN STAFF"} />
          <SectionContainer users={allUsers} section={"ALPHA"} />
        </div>
        <div className="sections-row">
          <SectionContainer users={allUsers} section={"BRAVO"} />
          <SectionContainer users={allUsers} section={"CHARLIE"} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
