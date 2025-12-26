"use client";
import { monthlyData } from "@/utils/areaChartData";
import { Card, Typography } from "@mui/material";
import React from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const DouelAreaChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
                <Tooltip content={CustomeTooltip} />
                <XAxis dataKey="month" />
                <YAxis dataKey="revenue" />
                <CartesianGrid strokeDasharray="3 3" opacity={"0.3"} />

                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CustomeTooltip = ({ active, payload, label }) => {
    console.log(active, payload, label);

    if (active && payload && payload.length) {
        return (
            <Card className="bg-white p-4 border border-gray-300 shadow text-end rounded-lg!">
                <Typography variant="body1" className="font-bold">
                    فروش : {payload[0].value}
                </Typography>
                <Typography variant="body1" className="text-green-500">
                    سود : {payload[1].value}
                </Typography>
            </Card>
        );
    }
    return null;
};
export default DouelAreaChart;
