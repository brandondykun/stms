import { useUsersContext } from "../../context/UsersContext";
import CustomDonutChart from "../CustomDonutChart";
import DlcIncompleteList from "../DlcIncompleteList";
import PmeIncomplete from "../PmeIncomplete";
import RifleQualFail from "../RifleQualFail";
import AcftFail from "../AcftFail";
import NeedLicense from "../NeedLicense";
import Promotable from "../Promotable";
import JfoQualified from "../JfoQualified";
import styles from "./AdminOverview.module.css";

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
  const deltaSectionCount = users.filter((user) => {
    return user.section === "DELTA";
  }).length;

  return (
    <div className={styles.primaryContent}>
      <div className={styles.chartsWrapper}>
        <div className={styles.donutChartsWrapper}>
          <div className={styles.donutChartsSubWrapper}>
            <CustomDonutChart title={"TOTAL"} filled={totalCount} total={30} />
            <CustomDonutChart
              title={"STAFF"}
              filled={staffSectionCount}
              total={6}
            />
            <CustomDonutChart
              title={"ALPHA"}
              filled={alphaSectionCount}
              total={8}
            />
          </div>
          <div className={styles.donutChartsSubWrapper}>
            <CustomDonutChart
              title={"BRAVO"}
              filled={bravoSectionCount}
              total={8}
            />
            <CustomDonutChart
              title={"CHARLIE"}
              filled={charlieSectionCount}
              total={8}
            />
            <CustomDonutChart
              title={"DELTA"}
              filled={deltaSectionCount}
              total={4}
            />
          </div>
        </div>
        <div className={styles.overviewListsWrapper}>
          <DlcIncompleteList />
          <PmeIncomplete />
          <RifleQualFail />
          <AcftFail />
          <NeedLicense />
          <Promotable />
          <JfoQualified />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
