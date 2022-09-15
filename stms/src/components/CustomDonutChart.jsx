import { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";

const CustomDonutChart = ({ title, filled, total }) => {
  const [numberFilled, setNumberFilled] = useState(0);
  const [percentFilled, setPercentFilled] = useState(0.0);

  const totalPercent = (filled / total) * 100;

  let color = "#de091b";

  if (totalPercent >= 85) {
    color = "#25db1f";
  } else if (totalPercent >= 70) {
    color = "#f0c907";
  }

  useEffect(() => {
    if (numberFilled < filled) {
      setTimeout(() => {
        setNumberFilled(numberFilled + filled / 100);
      }, 5);

      if (percentFilled < totalPercent) {
        setTimeout(() => {
          setPercentFilled(percentFilled + totalPercent / 10);
        }, 50);
      }
    }
  }, [numberFilled, percentFilled, filled]);

  return (
    <div className="donut-chart-wrapper">
      <div className="donut-chart-title">
        <div>{title}</div>
        <div>STRENGTH</div>
      </div>
      <DonutChart
        interactive={false}
        height={150}
        width={150}
        legend={false}
        className="donut-chart"
        colors={total - numberFilled > 0 ? ["#3b3b3b", color] : [color]}
        data={
          total - numberFilled > 0
            ? [
                {
                  label: "Empty",
                  value: total - numberFilled,
                },
                {
                  label: "Filled",
                  value: numberFilled,
                },
              ]
            : [
                {
                  label: "Filled",
                  value: numberFilled,
                },
              ]
        }
      />
      <div className="donut-text">{totalPercent?.toFixed(0)}%</div>
    </div>
  );
};

export default CustomDonutChart;
