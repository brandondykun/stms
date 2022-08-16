import { useUsersContext } from "../context/UsersContext";
import CustomDonutChart from "./CustomDonutChart";
import DlcIncompleteList from "./DlcIncompleteList";
import PmeIncomplete from "./PmeIncomplete";
import RifleQualFail from "./RifleQualFail";

const AdminOverview = () => {
  const { users } = useUsersContext();

  const totalCount = users.length;

  const staffSectionCount = users.filter((user) => {
    return user.section === "BN STAFF";
  }).length;
  const alphaSectionCount = users.filter((user) => {
    return user.section === "ALPHA";
  }).length;
  const bravoSectionCount = users.filter((user) => {
    return user.section === "BRAVO";
  }).length;
  const charlieSectionCount = users.filter((user) => {
    return user.section === "CHARLIE";
  }).length;

  return (
    <div className="primary-content">
      <div className="charts-wrapper">
        <CustomDonutChart
          title={"TOTAL STRENGTH"}
          filled={totalCount}
          total={30}
        />
        <CustomDonutChart
          title={"STAFF STRENGTH"}
          filled={staffSectionCount}
          total={6}
        />
        <CustomDonutChart
          title={"ALPHA STRENGTH"}
          filled={alphaSectionCount}
          total={8}
        />
        <CustomDonutChart
          title={"BRAVO STRENGTH"}
          filled={bravoSectionCount}
          total={8}
        />
        <CustomDonutChart
          title={"CHARLIE STRENGTH"}
          filled={charlieSectionCount}
          total={8}
        />
        <DlcIncompleteList />
        <PmeIncomplete />
        <RifleQualFail />
      </div>
    </div>
  );
};

export default AdminOverview;
