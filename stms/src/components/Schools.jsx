import { useUsersContext } from "../context/UsersContext";

const Schools = () => {
  const { users } = useUsersContext();
  return (
    <div className="primary-content">
      <h1>Coming Soon</h1>
    </div>
  );
};

export default Schools;
