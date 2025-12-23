import CustomerForm from "@/components/fomrs/CustomerForm";
import SaleForm from "@/components/fomrs/SaleForm";
import PageLayout from "@/components/PageLayout";
import ProductSelect from "@/components/product/SelectProduct";
import { productsData } from "@/utils/mokaProducts";
import {
    AddRounded,
    ArrowBackRounded,
    AttachMoneyRounded,
    CloseRounded,
    TrendingUpRounded,
} from "@mui/icons-material";
import { Avatar, Button, Card, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import SaleContent from "./SaleContent";

const SalePage = async () => {
    const historyData = await fetch(
        `${process.env.BACKEND_API_URL}api/orders/`,
        { cache: "no-store" }
    ).then((res) => res.json());

    console.log(historyData);
    return (
        <PageLayout>
            <Box className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4">
                <Card className="flex flex-col items-center p-4 rounded-lg! w-full">
                    <Box className="w-full justify-start flex items-center gap-2">
                        <AttachMoneyRounded
                            className="rounded-full"
                            sx={{
                                bgcolor: "warning.light",
                                width: 40,
                                height: 40,
                                padding: 1,
                                color: "white",
                            }}
                        />
                        <Typography variant="body1">جمع فروش ها</Typography>
                    </Box>
                    <Typography variant="h5" className="font-bold!">
                        ت 230,000
                    </Typography>
                    <Typography variant="caption">
                        از تمام فروش های ثبت شده
                    </Typography>
                </Card>
                <Card className="flex flex-col items-center p-4 rounded-lg! w-full">
                    <Box className="w-full justify-start flex items-center gap-2">
                        <TrendingUpRounded
                            className="rounded-full"
                            sx={{
                                bgcolor: "success.light",
                                width: 40,
                                height: 40,
                                padding: 1,
                                color: "white",
                            }}
                        />
                        <Typography variant="body1">سود فروش ها</Typography>
                    </Box>
                    <Typography variant="h5" className="font-bold!">
                        ت 230,000
                    </Typography>
                    <Typography variant="caption">
                        از تمام فروش های ثبت شده
                    </Typography>
                </Card>
            </Box>
            <Box className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {/* all of logics are here */}
                <SaleContent />

                <Card className="rounded-lg! p-4 col-span-full overflow-y-scroll! h-200 ">
                    <Box className="w-full flex items-center justify-between ">
                        <Typography variant="subtitle1">
                            تاریخچه فروش
                        </Typography>
                        <Link
                            href={"/sale/history"}
                            className="text-sm text-blue-700"
                        >
                            مشاهده همه <ArrowBackRounded />{" "}
                        </Link>
                    </Box>
                    <Box
                        className="grid grid-cols-3 text-center items-center justify-between py-2 rounded-lg mb-2 text-white sticky z-50 top-0 "
                        bgcolor={"primary.main"}
                    >
                        <Typography variant="subtitle1" fontWeight={"bold"}>
                            محصول
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={"bold"}>
                            تاریخ
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={"bold"}>
                            قیمت
                        </Typography>
                    </Box>

                    <Box className="flex-col flex gap-2 ">
                        {historyData?.results.map((history) => (
                            <Box
                                key={history.id}
                                className="w-full rounded-xl! border border-gray-200 py-4 px-6 flex items-center justify-between"
                            >
                                <Box className="flex items-center gap-2">
                                    <span>
                                        <Typography variant="subtitle1">
                                            {history.customer_name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            fontSize={12}
                                            color="info"
                                        >
                                            {history.id}
                                        </Typography>
                                    </span>
                                </Box>
                                <Typography variant="subtitle1">
                                    {history.order_date}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {Number.parseInt(
                                        Number(history.total_price)
                                    ).toLocaleString("fa-IR")}{" "}
                                    تومان
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Box>
        </PageLayout>
    );
};

export default SalePage;
