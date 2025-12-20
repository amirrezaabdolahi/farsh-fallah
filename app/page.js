import AreaChartComponent from "@/components/charts/AreaChartComponent";
import BarChartView from "@/components/charts/BarChart";
import PageLayout from "@/components/PageLayout";
import {
    AddCardRounded,
    AttachMoneyRounded,
    CalendarMonthRounded,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";

async function fetchJson(url) {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return res.json();
}

export default async function Home() {
    const [dashBoardData, barChartData, areaChartData] = await Promise.all([
        fetchJson(`${process.env.BACKEND_API_URL}api/reports/dashboard/`),
        fetchJson(
            `${process.env.BACKEND_API_URL}api/reports/customers_by_region/`
        ),
        fetchJson(`${process.env.BACKEND_API_URL}api/reports/chart_sales/`),
    ]);

    const cards = [
        {
            id: 1,
            title: "درآمد ماه",
            value: `${Number(dashBoardData?.month_profit).toLocaleString(
                "fa-IR"
            )} ت`,
            icon: <AttachMoneyRounded />,
        },
        {
            id: 2,
            title: "درآمد روز",
            value: `${Number(dashBoardData?.today_profit).toLocaleString(
                "fa-IR"
            )} ت`,
            icon: <CalendarMonthRounded />,
        },
        {
            id: 3,
            title: "تعداد فروش روز",
            value: dashBoardData?.today_orders ?? 0,
            icon: <AddCardRounded />,
        },
        {
            id: 4,
            title: "تعداد فروش ماه",
            value: dashBoardData?.month_sales ?? 0,
            icon: <AddCardRounded />,
        },
    ];

    return (
        <PageLayout>
            {/* summary cards */}
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        className="p-4 flex items-center justify-between relative"
                    >
                        {card.id === 1 && (
                            <span className="absolute right-0 top-0 bottom-0 w-1 bg-blue-400" />
                        )}

                        <Box>
                            <Typography variant="body1" mb={1}>
                                {card.title}
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="primary.dark"
                            >
                                {card.value}
                            </Typography>
                        </Box>

                        <IconButton className="bg-blue-100 text-blue-500!">
                            {card.icon}
                        </IconButton>
                    </Card>
                ))}
            </Box>

            {/* actions + bar chart */}
            <Box className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-4 h-150 lg:h-100">
                <Box className="flex flex-col gap-4 h-full">
                    <Button variant="contained" className="h-full" fullWidth>
                        اضافه کردن فرش
                    </Button>
                    <Button variant="outlined" className="h-full" fullWidth>
                        مشاهده فرش‌ها
                    </Button>
                </Box>

                <Box className="flex flex-col gap-4">
                    <Button variant="contained" className="h-full" fullWidth>
                        اضافه کردن تابلو
                    </Button>
                    <Button variant="outlined" className="h-full" fullWidth>
                        مشاهده تابلوها
                    </Button>
                </Box>

                <Card
                    className="col-span-full lg:col-span-4 rounded-lg! p-4"
                    dir="ltr"
                >
                    <BarChartView data={barChartData?.regions ?? []} />
                </Card>
            </Box>

            {/* area chart */}
            <Divider sx={{ my: 4 }} />
            <AreaChartComponent data={areaChartData ?? []} />
        </PageLayout>
    );
}
