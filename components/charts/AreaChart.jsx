"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AreaChartView = ({ data }) => {
  return (

    <ResponsiveContainer width="100%" height="100%" className="shadow-lg p-6 pl-0 rounded-lg">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />

        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const parts = value.split("-");
            return `${parts[1]}-${parts[2]}`; // MM-DD
          }}
        />

        <YAxis />

        <Tooltip
          labelFormatter={(value) => {
            const parts = value.split("-");
            return `${parts[1]}-${parts[2]}`; // Tooltip هم درست بشه
          }}
        />

        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fill="#1976D2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartView;
