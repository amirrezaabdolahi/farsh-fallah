import PageLayout from "@/components/PageLayout";
import React from "react";
import PersianDateRangePicker from "./PersianDateRangePicker";
import { Box, Card, Typography } from "@mui/material";
import {
    AttachMoneyRounded,
    Inventory2Rounded,
    TrendingUpRounded,
} from "@mui/icons-material";
import DouelAreaChart from "@/components/charts/DouelAreaChart";

const ReportPage = async ({ searchParams }) => {
    const start = await searchParams?.start_date;
    const end = await searchParams?.end_date;
    const params = new URLSearchParams();

    if (start && end) {
        params.append("start_date", start);
        params.append("end_date", end);
    }

    const reportDetail = await fetch(
        `${process.env.BACKEND_API_URL}api/reports/chart_sales/?${params}`
    ).then((res) => res.json());

    console.log(reportDetail);

    const topProductsData = await fetch(
        `${process.env.BACKEND_API_URL}api/reports/top_products/`,
        {
            cache: "no-store",
        }
    ).then((res) => res?.json());

    return (
        <PageLayout>
            <Typography variant="h6" gutterBottom>
                گزارش فروش با تاریخ
            </Typography>
            <PersianDateRangePicker start={start} end={end} />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                لطفاً یک بازه زمانی را برای فیلتر کردن نتایج جستجو انتخاب کنید.
            </Typography>
            <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 rounded-lg!">
                    <Box className="flex items-center justify-between">
                        <Typography variant="body1">درآمد حاصل</Typography>
                        <AttachMoneyRounded fontSize="small" color="success" />
                    </Box>
                    <Box className="flex items-center gap-1">
                        <Typography variant="h6" fontWeight={"bold"}>
                            {reportDetail?.data
                                ? Number(
                                      reportDetail?.data?.total_sale
                                  ).toLocaleString("fa")
                                : 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            تومان
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        مجموع درآمد حاصل از فروش در بازه زمانی انتخاب شده
                    </Typography>
                </Card>
                <Card className="p-4 rounded-lg!">
                    <Box className="flex items-center justify-between">
                        <Typography variant="body1">سود حاصل</Typography>
                        <TrendingUpRounded fontSize="small" color="success" />
                    </Box>
                    <Box className="flex items-center gap-1">
                        <Typography variant="h5" fontWeight={"bold"}>
                            {reportDetail?.data
                                ? Number(
                                      reportDetail?.data?.total_profit
                                  ).toLocaleString("fa")
                                : 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            تومان
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        مجموع سود حاصل از فروش در بازه زمانی انتخاب شده
                    </Typography>
                </Card>
                <Card className="p-4 rounded-lg!">
                    <Box className="flex items-center justify-between">
                        <Typography variant="body1">تعداد فروش</Typography>
                        <Inventory2Rounded fontSize="small" color="success" />
                    </Box>
                    <Box className="flex items-center gap-1">
                        <Typography variant="h5" fontWeight={"bold"}>
                            {reportDetail?.data
                                ? reportDetail?.data?.total_count
                                : 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            فروش
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        تعداد کل فروش‌های انجام شده در بازه زمانی انتخاب شده
                    </Typography>
                </Card>
            </Box>

            <Card className="mt-4 p-4 rounded-lg!">
                <Typography variant="body1" gutterBottom>
                    نمودار سود و درآمد
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    نمودار فروش در بازه زمانی انتخاب شده نمایش داده خواهد شد.
                </Typography>

                <Box className="w-full" dir="ltr">
                    <DouelAreaChart
                        data={
                            reportDetail?.data
                                ? reportDetail?.data.daily
                                : reportDetail?.month
                                ? reportDetail?.month.data
                                : []
                        }
                    />
                </Box>
            </Card>
            <Box className="w-full flex justify-between gap-4 mt-4 flex-col md:flex-row">
                <Card className="w-full h-full p-4 rounded-lg!">
                    <Typography variant="body1" gutterBottom>
                        برترین محصولات
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        نمودار برترین محصولات در بازه زمانی انتخاب شده نمایش
                        داده خواهد شد.
                    </Typography>
                    <Box className="w-full" dir="ltr">
                        {topProductsData && topProductsData.length > 0 ? (
                            <>
                                {topProductsData.map((product) => (
                                    <Card
                                        key={product.name}
                                        className="flex items-center justify-between mt-2 p-2"
                                    >
                                        <Typography variant="body2">
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={"bold"}
                                        >
                                            {product.sales_count} تعداد فروش
                                        </Typography>
                                    </Card>
                                ))}
                            </>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                داده‌ای برای نمایش وجود ندارد.
                            </Typography>
                        )}
                    </Box>
                </Card>
                <Card className="w-full h-full p-4 rounded-lg!">
                    <Typography variant="body1" gutterBottom>
                        نمودار برترین طرح محصولات
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        نمودار برترین طرح محصولات در بازه زمانی انتخاب شده نمایش
                        داده خواهد شد.
                    </Typography>
                    <Box className="w-full" dir="ltr">
                        <DouelAreaChart />
                    </Box>
                </Card>
            </Box>
        </PageLayout>
    );
};

export default ReportPage;
