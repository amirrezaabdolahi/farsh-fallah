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

const HistoryPage = async () => {
    const historyData = await fetch(
        `${process.env.BACKEND_API_URL}api/orders/`
    ).then((res) => res.json());

    console.log(historyData);

    return (
        <PageLayout>
            <Box className="w-full items-center">
                <Typography variant="h5">تاریخچه</Typography>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {historyData?.results.map((history) => {
                    const [date, hour] = history?.order_date?.split(" - ") || [
                        "",
                        "",
                    ];
                    return (
                        <Card
                            elevation={2}
                            key={history.id}
                            className="p-2 rounded-lg! flex flex-col gap-2"
                        >
                            <Typography variant="body1" fontWeight="bold">
                                {history.customer_name}
                            </Typography>
                            <Box className="w-full items-center flex gap-2">
                                <Typography
                                    variant="body2"
                                    className="flex items-center gap-1"
                                >
                                    <AccessTimeRounded color="primary" />
                                    {hour}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="flex items-center gap-1"
                                >
                                    <AttachMoneyRounded color="success" />
                                    {Number(
                                        history.total_price
                                    ).toLocaleString()}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                className="flex items-center gap-1"
                            >
                                <CalendarMonthRounded color="warning" />
                                {date}
                            </Typography>
                            <Typography variant="body1">
                                تعداد آیتم‌ها: {history.items.length}
                            </Typography>
                            <Box className="w-full items-center flex gap-2 mt-2">
                                <Link href={`/sale/history/${history.id}`} >
                                    <Button variant="outlined" className="rounded-lg!" endIcon={<ArrowBackRounded />} size="small">
                                        مشاهده
                                    </Button>
                                </Link>
                            </Box>
                        </Card>
                    );
                })}
            </Box>
        </PageLayout>
    );
};

export default HistoryPage;
