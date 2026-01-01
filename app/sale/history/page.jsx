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
            <History />
        </PageLayout>
    );
};

export default HistoryPage;
