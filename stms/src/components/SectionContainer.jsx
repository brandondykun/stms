import { Link } from "react-router-dom";

const SectionContainer = ({ users, section }) => {
  return (
    <div className="section-container">
      <h2 className="section-title">{section}</h2>
      {users?.map((user) => {
        return (
          <Link to={`/user-info/${user.id}`} className="text-link">
            <div className="user-container" key={user.id}>
              {user.rank} {user.last_name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SectionContainer;
