import { useState } from "react";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";

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
    // getUsers();
  }, []);

  return (
    <div className="primary-content">
      <h1 className="page-title">Section Overview</h1>
      <div>This is the main content</div>
      {allUsers?.map((user) => {
        return (
          <div key={user.id}>
            {user?.rank} {user?.last_name}
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
