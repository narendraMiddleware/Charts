import React from "react";
import { BarChart, XYPlot, HorizontalGridLines } from "react-d3-components";

function BarChartContainer() {
  let data = [
    {
      label: "Aldersgruppe",
      values: [
        { x: "18-24", y: 7000 },
        { x: "25-34", y: 31000 },
        { x: "35-44", y: 34500 },
        { x: "45-55", y: 25000 },
        { x: "55-64", y: 7500 }
      ]
    }
  ];
  return (
    <h1 className="title">
      View per agegroup
      <p className="age">
        <span class="dot" /> Age
      </p>
      <BarChart
        data={data}
        width={347}
        height={307}
        margin={{ top: 10, bottom: 50, left: 50, right: 0 }}
      />
    </h1>
  );
}
export default BarChartContainer;
