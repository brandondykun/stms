import DonutChart from "react-donut-chart";

const CustomDonutChart = ({ title, filled, total }) => {
  const totalPercent = ((filled / total) * 100).toFixed(1);

  let color = "#de091b";

  if (totalPercent >= 85) {
    color = "#25db1f";
  } else if (totalPercent >= 70) {
    color = "#f0c907";
  }

  return (
    <div className="donut-chart-wrapper">
      <div className="chart-title">
        <div>{title}</div>
        <div>STRENGTH</div>
      </div>
      <DonutChart
        interactive={false}
        height={150}
        width={150}
        legend={false}
        className="donut-chart"
        colors={["#3b3b3b", color]}
        data={[
          {
            label: "Empty",
            value: total - filled,
          },
          {
            label: "Filled",
            value: filled,
          },
        ]}
      />
      <div className="donut-text">{totalPercent}%</div>
    </div>
  );
};

export default CustomDonutChart;
