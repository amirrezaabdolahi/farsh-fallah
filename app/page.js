import AreaChartComponent from "@/components/charts/AreaChartComponent";
import BarChartView from "@/components/charts/BarChart";
import ChartFiterComponent from "@/components/charts/ChartFiterComponent";
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
    TextField,
    Typography,
} from "@mui/material";

export default async function Home() {
    const dashBoardData = await fetch(
        `${process.env.BACKEND_API_URL}api/reports/dashboard/`
    ).then((res) => res.json());

    const BarChartData = await fetch(
        `${process.env.BACKEND_API_URL}api/reports/customers_by_region/`
    ).then((res) => res.json());

    const AreaChartData = await fetch(`${process.env.BACKEND_API_URL}api/reports/chart_sales/`).then(res => res.json())

    console.log(AreaChartData);

    const cards = [
        {
            id: 1,
            title: "درآمد ماه",
            value: `${Number(dashBoardData?.month_profit).toLocaleString()}ت`,
            icon: <AttachMoneyRounded fontSize="inherit" color="inherit" />,
        },
        {
            id: 2,
            title: "درآمد روز",
            value: `${Number(dashBoardData?.today_profit).toLocaleString()}ت`,
            icon: <CalendarMonthRounded fontSize="inherit" color="inherit" />,
        },
        {
            id: 3,
            title: "تعداد فروش روز",
            value: `${dashBoardData?.today_orders}`,
            icon: <AddCardRounded fontSize="inherit" color="inherit" />,
        },
        {
            id: 4,
            title: "تعداد فروش ماه",
            value: `${dashBoardData?.month_sales}`,
            icon: <AddCardRounded fontSize="inherit" color="inherit" />,
        },
    ];

    return (
        <PageLayout>
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between py-2 gap-2 lg:gap-4 ">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        className="w-full p-4 bg-white rounded-lg shadow-md relative flex items-center justify-between"
                    >
                        <div
                            className={`absolute w-1 right-0 top-0 bottom-0 bg-blue-400 ${
                                card.id === 1 ? "block" : "hidden"
                            }`}
                        ></div>
                        <div className="">
                            <Typography
                                variant="h6"
                                className="mb-2 text-gray-700"
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                variant="h6"
                                className="font-bold!"
                                color="primary.dark"
                            >
                                {card.value}
                            </Typography>
                        </div>
                        <IconButton
                            size=""
                            className="bg-blue-100 text-blue-500!"
                        >
                            {card.icon}
                        </IconButton>
                    </Card>
                ))}
            </Box>

            {/* bar chart and add product boxs */}
            <Box className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 h-150 lg:h-100 mt-4">
                <Box className="flex flex-col gap-4 ">
                    <Button
                        variant="contained"
                        color="primary"
                        className="h-full w-full"
                    >
                        اضافه کردن فرش
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="h-full w-full"
                    >
                        مشاهده فرش ها
                    </Button>
                </Box>

                <Box className="flex flex-col gap-4">
                    <Button
                        variant="contained"
                        color="primary"
                        className="h-full w-full"
                    >
                        اضافه کردن تابلو
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="h-full w-full"
                    >
                        مشاهده تابلو ها
                    </Button>
                </Box>

                <Box
                    className="col-span-full lg:col-span-4 shadow-lg border border-gray-100 rounded-lg p-6 "
                    dir="ltr"
                >
                    <BarChartView data={BarChartData.regions} />
                </Box>
            </Box>

            {/* area chart */}
            <Box></Box>
            <Divider className="my-4!" />
            <AreaChartComponent data={AreaChartData} />
        </PageLayout>
    );
}
