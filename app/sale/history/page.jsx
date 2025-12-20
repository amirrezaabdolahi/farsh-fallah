import PageLayout from "@/components/PageLayout";
import { saleHistory } from "@/utils/mokaSaleHistory";
import {
    AccessTimeRounded,
    ArrowBack,
    ArrowBackRounded,
    ArrowForward,
    AttachMoneyRounded,
    CalendarMonthRounded,
} from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import History from "./History";

const HistoryPage = () => {
    return (
        <PageLayout>
            <Box className="w-full items-center">
                <Typography variant="h5">تاریخچه</Typography>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <History />
            </Box>
        </PageLayout>
    );
};

export default HistoryPage;
