import { Link } from "react-router-dom";

const SectionContainer = ({ users, section }) => {
  const filteredUsers = users
    .filter((user) => {
      return user.section === section;
    })
    .sort((a, b) => {
      return a.unit_position - b.unit_position;
    });

  return (
    <div className="section-container">
      <h2 className="section-title">{section}</h2>
      {filteredUsers?.length > 0 ? (
        filteredUsers?.map((user) => {
          return (
            <Link
              key={user.id}
              to={`/user-info/${user.id}`}
              className="text-link"
            >
              <div className="user-container">
                <span className="margin-r-05">{user.role} -</span>
                {user.rank} {user.last_name}
              </div>
            </Link>
          );
        })
      ) : (
        <div className="color-dark-placeholder">No one assigned</div>
      )}
    </div>
  );
};

export default SectionContainer;
