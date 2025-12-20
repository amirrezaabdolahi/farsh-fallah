"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import {
    Box,
    Card,
    Typography,
    Divider,
    CircularProgress,
} from "@mui/material";
import {
    CalendarMonthRounded,
    AccessTimeRounded,
    AttachMoneyRounded,
} from "@mui/icons-material";

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/order/${id}/`);
                if (!res.ok) throw new Error("Fetch failed");
                const data = await res.json();
                setOrder(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <PageLayout>
                <CircularProgress />
            </PageLayout>
        );
    }

    if (!order) {
        return (
            <PageLayout>
                <Typography>سفارش پیدا نشد</Typography>
            </PageLayout>
        );
    }

    console.log(order)


    let date = "";
    let time = "";

    if (order?.order_date) {
        [date, time] = order.order_date.split(" - ");
    }

    return (
        <PageLayout>
            <Box className="flex flex-col gap-4">
                <Typography variant="h5">جزئیات سفارش #{order.id}</Typography>

                {/* Customer Info */}
                <Card className="p-3">
                    <Typography fontWeight="bold">
                        {order.customer_name}
                    </Typography>
                    <Typography>{order.customer_phone}</Typography>
                    <Typography>
                        {order.customer_city} | {order.customer_region}
                    </Typography>
                    {order.customer_address && (
                        <Typography>{order.customer_address}</Typography>
                    )}
                </Card>

                {/* Order Meta */}
                <Card className="p-3 flex gap-4 flex-wrap">
                    <Typography className="flex items-center gap-1">
                        <CalendarMonthRounded color="warning" />
                        {date}
                    </Typography>
                    <Typography className="flex items-center gap-1">
                        <AccessTimeRounded color="primary" />
                        {time}
                    </Typography>
                    <Typography className="flex items-center gap-1">
                        <AttachMoneyRounded color="success" />
                        {Number(order.total_price).toLocaleString()} تومان
                    </Typography>
                </Card>

                {/* Items */}
                <Box className="flex flex-col gap-2">
                    {order?.items.map((item) => (
                        <Card key={item.id} className="p-3">
                            <Typography fontWeight="bold">
                                {item.product.name}
                            </Typography>

                            <Divider className="my-2" />

                            <Typography>
                                قیمت فروش: {Number(item.price).toLocaleString()}{" "}
                                تومان
                            </Typography>

                            <Typography>
                                تخفیف: {Number(item.discount).toLocaleString()}{" "}
                                تومان ({item.discount_percent}%)
                            </Typography>

                            <Typography>
                                مبلغ نهایی:{" "}
                                {Number(item.final_price).toLocaleString()}{" "}
                                تومان
                            </Typography>

                            <Typography
                                color={
                                    Number(item.profit) < 0
                                        ? "error"
                                        : "success.main"
                                }
                            >
                                سود: {Number(item.profit).toLocaleString()}{" "}
                                تومان
                            </Typography>
                        </Card>
                    ))}
                </Box>

                {/* Summary */}
                <Card className="p-3">
                    <Typography fontWeight="bold">
                        جمع کل: {Number(order.total_price).toLocaleString()}{" "}
                        تومان
                    </Typography>
                    <Typography
                        fontWeight="bold"
                        color={
                            Number(order.total_profit) < 0
                                ? "error"
                                : "success.main"
                        }
                    >
                        سود کل: {Number(order.total_profit).toLocaleString()}{" "}
                        تومان
                    </Typography>
                </Card>
            </Box>
        </PageLayout>
    );
};

export default OrderDetailPage;
