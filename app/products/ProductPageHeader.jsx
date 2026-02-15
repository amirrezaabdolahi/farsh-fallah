import {
    DataThresholdingRounded,
    TrendingDownRounded,
    TrendingUpRounded,
} from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import React from "react";

const ProductPageHeader = ({ data }) => {
    let pops = null;

    if (data) {
        pops = data;
    }

    return (
        <Card className="w-full rounded-xl! overflow-hidden border border-gray-200 grid grid-cols-1 md:grid-cols-3 items-center justify-between shadow-lg px-6 py-4 gap-2">
            <Box className="flex items-center justify-center gap-2">
                <Box
                    sx={{
                        backgroundColor: "success.light",
                        color: "white",
                        padding: 2,
                    }}
                    className="rounded-2xl"
                >
                    <DataThresholdingRounded />
                </Box>
                <Box>
                    <Typography variant="subtitle1">بیشترین فروش</Typography>
                    <Typography variant="body1" className="font-bold!">
                        {pops ? pops[0].name : "فرش"}
                    </Typography>
                </Box>
            </Box>
            <Box className="flex items-center justify-center gap-2">
                <Box
                    sx={{
                        backgroundColor: "primary.light",
                        color: "white",
                        padding: 2,
                    }}
                    className="rounded-2xl"
                >
                    <TrendingUpRounded />
                </Box>
                <Box>
                    <Typography variant="subtitle1">بالاترین سود</Typography>
                    <Typography variant="body1" className="font-bold!">
                        {pops ? pops[0].name : "فرش"}
                    </Typography>
                </Box>
            </Box>
            <Box className="flex items-center justify-center gap-2">
                <Box
                    sx={{
                        backgroundColor: "error.light",
                        color: "white",
                        padding: 2,
                    }}
                    className="rounded-2xl"
                >
                    <TrendingDownRounded />
                </Box>
                <Box>
                    <Typography variant="subtitle1">کم ترین فروش</Typography>
                    <Typography variant="body1" className="font-bold!">
                        {pops ? pops[pops.length - 1].name : "فرش"}
                    </Typography>
                </Box>
            </Box>
            
        </Card>
    );
};

export default ProductPageHeader;
