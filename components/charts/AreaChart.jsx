"use client";

import { Card, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// ********** Tooltip باید قبل از استفاده تعریف شود **********
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <Card
        className="bg-white p-4 border border-gray-300 shadow rounded-lg text-end"
        sx={{ direction: "rtl" }}
      >
        <Typography variant="body1" fontWeight="bold">
          زمان: {label}
        </Typography>

        <Typography variant="body1" color="green">
          مبلغ: {payload[0].value}
        </Typography>
      </Card>
    );
  }
  return null;
}


// ********** AreaChartView **********
const AreaChartView = ({ data, xKey, yKey }) => {
  const formatLabel = (val) => {
    // 00:00 → ساعت
    if (val.includes(":")) return val;

    // MM (ماه)
    if (val.length === 2 && !val.includes("-")) return val;

    // YYYY-MM-DD → تبدیل به MM-DD
    const p = val.split("-");
    if (p.length === 3) return `${p[1]}-${p[2]}`;

    return val;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey={xKey} tickFormatter={formatLabel} />
        <YAxis />

        <Tooltip labelFormatter={formatLabel} content={<CustomTooltip />} />

        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey={yKey}
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartView;
