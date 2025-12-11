"use client";
import { Card, Typography } from '@mui/material';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartView = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                style={{ aspectRatio: 1.618 }}
                responsive
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis width="auto" dataKey="count" />
                <Tooltip content={CustomeTooltip} />
                <Bar dataKey="count" fill="#1976D2" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const CustomeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Card className="bg-white p-4 border border-gray-300 shadow text-end rounded-lg!">
                <Typography variant='body1' className="font-bold">منطقه : {label}</Typography>
                <Typography variant='body1' className="text-green-500">تعداد : {payload[0].value}</Typography>
            </Card>
        );
    }
    return null;
}

export default BarChartView;