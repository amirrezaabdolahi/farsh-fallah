"use client";
import { Card, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import CustomeTooltip from "./CustomeToolTip";

const BarChartView = ({ data }) => {

    console.log(data)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart style={{ aspectRatio: 1.618 }} responsive data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
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

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis width="auto" dataKey="customer_count" />
                <Tooltip content={CustomeTooltip} />
                <Bar
                    dataKey="customer_count"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    activeBar={<Rectangle fill="#8884d8" />}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};



export default BarChartView;
