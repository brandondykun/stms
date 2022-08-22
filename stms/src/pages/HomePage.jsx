import { useState } from "react";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";
import SectionContainer from "../components/SectionContainer";
import ScaleLoader from "react-spinners/ScaleLoader";
import Logo from "../assets/fist-logo.png";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const start = Date.now();
      const res = await apiCalls.getAllUsers();
      if (res.status === 200) {
        setAllUsers(res.data);
        const duration = Date.now() - start;
        // set timeout to keep min 1 sec display of spinner
        setTimeout(() => {
          setLoading(false);
        }, 1000 - duration);
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
      <div className="small-image-wrapper">
        <img
          className="image-container small-image"
          src={Logo}
          alt="FIST logo"
        />
      </div>
      {!loading && (
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
      )}

      {loading && (
        <div className="flex-center-center">
          <ScaleLoader
            color={"#FEC30A"}
            loading={loading}
            height={45}
            width={4}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
