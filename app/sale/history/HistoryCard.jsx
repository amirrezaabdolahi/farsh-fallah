"use client";
import {
    AccessTimeRounded,
    ArrowBackRounded,
    AttachMoneyRounded,
    CalendarMonthRounded,
    DeleteRounded,
} from "@mui/icons-material";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const HistoryCard = ({ order, date, hour, handleDeleteOrder }) => {
    return (
        <Card elevation={2} className="p-2 rounded-lg! flex flex-col gap-2">
            <Typography variant="body1" fontWeight="bold">
                {order.customer_name}
            </Typography>

            <Box className="w-full items-center flex gap-2">
                <Typography variant="body2" className="flex items-center gap-1">
                    <AccessTimeRounded color="primary" />
                    {hour}
                </Typography>

                <Typography variant="body2" className="flex items-center gap-1">
                    <AttachMoneyRounded color="success" />
                    {Number(order.total_price).toLocaleString()}
                </Typography>
            </Box>

            <Typography variant="body2" className="flex items-center gap-1">
                <CalendarMonthRounded color="warning" />
                {date}
            </Typography>

            <Typography variant="body1">
                تعداد آیتم‌ها: {order.items.length}
            </Typography>

            <Box className="w-full items-center flex gap-2 mt-2 justify-between">
                <Link href={`/sale/history/${order.id}`}>
                    <Button
                        variant="outlined"
                        size="small"
                        endIcon={<ArrowBackRounded />}
                        className="rounded-lg!"
                    >
                        مشاهده
                    </Button>
                </Link>
                <IconButton onClick={(e) => handleDeleteOrder(order.id)}>
                    <DeleteRounded color="error" />
                </IconButton>
            </Box>
        </Card>
    );
};

export default HistoryCard;
