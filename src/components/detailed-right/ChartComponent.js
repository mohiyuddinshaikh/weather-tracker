import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ChartComponent(props) {
  const {
    customData,
    xAxisDataKey,
    line1DataKey,
    line2DataKey,
    tooltipComponent,
  } = props;
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={500}
        data={customData}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip content={tooltipComponent} />
        <Legend />
        <Line
          type="monotone"
          dataKey={line1DataKey}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey={line2DataKey} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
