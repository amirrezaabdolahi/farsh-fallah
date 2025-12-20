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

/* ---------- helpers ---------- */
const formatLabel = (val) => {
    if (typeof val !== "string") return val;

    if (val.includes(":")) return val;
    if (val.length === 2 && !val.includes("-")) return val;

    const p = val.split("-");
    if (p.length === 3) return `${p[1]}-${p[2]}`;

    return val;
};

const formatNumber = (num) => {
    if (num == null) return "";

    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;

    return num.toLocaleString("fa-IR");
};

/* ---------- tooltip ---------- */
function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <Card
            sx={{
                p: 1.5,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 3,
                direction: "rtl",
            }}
        >
            <Typography fontWeight="bold">
                زمان: {formatLabel(label)}
            </Typography>

            {payload.map((item) => (
                <Typography key={item.dataKey} color="success.main">
                    مبلغ: {item.value.toLocaleString("fa-IR")}
                </Typography>
            ))}
        </Card>
    );
}

/* ---------- chart ---------- */
const AreaChartView = ({ data = [], xKey, yKey }) => {
    if (!Array.isArray(data) || !data.length) return null;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="5 5" />

                <XAxis
                    dataKey={xKey}
                    tickFormatter={formatLabel}
                    minTickGap={20}
                />

                <YAxis
                    width={80}
                    tickFormatter={formatNumber}
                    interval="preserveStartEnd"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip
                    labelFormatter={formatLabel}
                    formatter={(value) => formatNumber(value)}
                    content={<CustomTooltip />}
                />

                <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>

                <Area
                    type="monotone"
                    dataKey={yKey}
                    stroke="#82ca9d"
                    fill="url(#areaFill)"
                    isAnimationActive={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartView;
