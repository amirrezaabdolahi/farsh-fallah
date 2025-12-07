"use client";
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
                <Tooltip />
                <Bar dataKey="count" fill="#1976D2" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartView;