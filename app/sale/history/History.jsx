"use client";

import { fetchOrders } from "@/utils/fetchOrders";
import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography, CircularProgress } from "@mui/material";
import {
    AccessTimeRounded,
    AttachMoneyRounded,
    CalendarMonthRounded,
    ArrowBackRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { toast } from "react-toastify";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadOrders = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const data = await fetchOrders({ page: pageNumber });

            if (!data || !Array.isArray(data.results)) {
                toast.error("خطا در دریافت تاریخچه سفارشات.");
                return;
            }

            setOrders((prev) => [...prev, ...data.results]);
            setHasMore(Boolean(data.next));
        } catch (error) {
            console.error("Error fetching history:", error);
            toast.error("خطا در دریافت تاریخچه سفارشات.");
        } finally {
            setLoading(false);
        }
    };

    // load first page
    useEffect(() => {
        loadOrders(page);
    }, []);

    const handleLoadMore = () => {
        if (!hasMore || loading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        loadOrders(nextPage);
    };

    if (orders.length === 0 && loading) {
        return (
            <Box className="flex justify-center mt-5">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {orders.length > 0 ? (
                orders.map((order) => {
                    const [date, hour] = order?.order_date?.split(" - ") || [
                        "",
                        "",
                    ];

                    return (
                        <Card
                            key={order.id}
                            elevation={2}
                            className="p-2 rounded-lg! flex flex-col gap-2"
                        >
                            <Typography variant="body1" fontWeight="bold">
                                {order.customer_name}
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
                                    {Number(order.total_price).toLocaleString()}
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
                                تعداد آیتم‌ها: {order.items.length}
                            </Typography>

                            <Box className="w-full items-center flex gap-2 mt-2">
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
                            </Box>
                        </Card>
                    );
                })
            ) : (
                <Typography variant="body1" fontWeight="bold">
                    تاریخچه سفارشات خالی است.
                </Typography>
            )}

            {hasMore && (
                <Box className="flex justify-center mt-4">
                    <Button
                        variant="contained"
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
                    </Button>
                </Box>
            )}
        </>
    );
};

export default History;
