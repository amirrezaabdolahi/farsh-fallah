"use client";
import { monthlyData } from "@/utils/areaChartData";
import { Card, Typography } from "@mui/material";
import dayjs from "dayjs";
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

const DouelAreaChart = ({ data }) => {

    console.log(data)

    const formattedData = data?.map((item) => ({
        ...item,
        label: dayjs(item.label).format("MM/DD"),
    }));
    const shortPrice = (value) => {
        if (value == null) return "0";

        if (value >= 1_000_000) {
            return (value / 1_000_000).toFixed(1) + "M";
        }

        if (value >= 1_000) {
            return (value / 1_000).toFixed(0) + "K";
        }

        return value.toString();
    };
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
                <Tooltip content={CustomeTooltip} />
                <XAxis dataKey="label" />
                <YAxis dataKey="sales" tickFormatter={shortPrice} />
                <CartesianGrid strokeDasharray="3 3" opacity={"0.3"} />

                <Line
                    type="monotone"
                    dataKey="sales"
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
    if (active && payload && payload.length) {
        return (
            <Card className="bg-white p-4 border border-gray-300 shadow text-end rounded-lg!">
                <Typography variant="body1" className="font-bold">
                    فروش : {payload[0]?.value}
                </Typography>
                <Typography variant="body1" className="text-green-500">
                    سود : {payload[1]?.value}
                </Typography>
            </Card>
        );
    }
    return null;
};
export default DouelAreaChart;
