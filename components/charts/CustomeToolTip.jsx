import { Card, Typography } from "@mui/material";

const CustomeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Card className="bg-white p-4 border border-gray-300 shadow text-end rounded-lg!">
                <Typography variant="body1" className="font-bold">
                    منطقه : {label}
                </Typography>
                <Typography variant="body1" className="text-green-500">
                    تعداد : {payload[0].value}
                </Typography>
            </Card>
        );
    }
    return null;
};

export default CustomeTooltip;
