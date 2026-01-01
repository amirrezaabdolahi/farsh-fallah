"use client";

import { fetchOrders } from "@/utils/fetchOrders";
import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    Typography,
    CircularProgress,
    IconButton,
    TextField,
} from "@mui/material";
import {
    AccessTimeRounded,
    AttachMoneyRounded,
    CalendarMonthRounded,
    ArrowBackRounded,
    DeleteRounded,
    SearchRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { toast } from "react-toastify";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");

    const loadOrders = async (pageNumber = 1, search) => {
        setLoading(true);
        try {
            const data = await fetchOrders({ page: pageNumber, search });

            if (!data || !Array.isArray(data.results)) {
                toast.error("خطا در دریافت تاریخچه سفارشات.");
                return;
            }

            console.log(data);

            setOrders((prev) => [...prev, ...data.results]);
            setHasMore(data?.next === null ? false : true);
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

    async function handleDeleteOrder(id) {
        if (!id) {
            console.error("Order ID is required");
            return { success: false, message: "Order ID is required" };
        }

        try {
            const res = await fetch(`/api/order/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Delete failed:", data.message);
                return {
                    success: false,
                    message: data.message || "Delete failed",
                };
            }

            console.log("Order deleted successfully:", id);

            toast.success("محصول با موفقیت خذف شد");

            setOrders(orders.filter((p) => p.id !== id));

            return {
                success: true,
                message: data.message || "Order deleted successfully",
            };
        } catch (error) {
            console.error("Delete API error:", error);
            return { success: false, message: "Server error" };
        }
    }

    const handleSearch = async () => {
        setOrders([])
        loadOrders(1, search);
    };

    return (
        <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <Box className="col-span-full flex items-center justify-between">
                <Typography variant="h6">تاریخچه</Typography>
                <Box className="flex items-center gap-2">
                    <TextField
                        variant="outlined"
                        size="small"
                        label="سرچ سفارش"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        <SearchRounded />
                    </Button>
                </Box>
            </Box>
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
                                <IconButton
                                    onClick={(e) => handleDeleteOrder(order.id)}
                                >
                                    <DeleteRounded color="error" />
                                </IconButton>
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
        </Box>
    );
};

export default History;
