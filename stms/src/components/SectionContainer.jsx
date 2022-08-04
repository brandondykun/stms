import { Link } from "react-router-dom";

const SectionContainer = ({ users, section }) => {
  return (
    <div className="section-container">
      <h2 className="section-title">{section}</h2>
      {users?.map((user) => {
        return (
          <Link
            key={user.id}
            to={`/user-info/${user.id}`}
            className="text-link"
          >
            <div className="user-container">
              {user.rank} {user.last_name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SectionContainer;
