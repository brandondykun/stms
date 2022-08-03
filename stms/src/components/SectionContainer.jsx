const SectionContainer = ({ users, section }) => {
  return (
    <div className="section-container">
      <h2 className="section-title">{section}</h2>
      {users?.map((user) => {
        return (
          <div className="user-container" key={user.id}>
            {user.rank} {user.last_name}
          </div>
        );
      })}
    </div>
  );
};

export default SectionContainer;
