
import AreaChartComponent from "@/components/charts/AreaChartComponent";
import BarChartView from "@/components/charts/BarChart";
import ChartFiterComponent from "@/components/charts/ChartFiterComponent";
import PageLayout from "@/components/PageLayout";
import { AddCardRounded, AttachMoneyRounded, CalendarMonthRounded } from "@mui/icons-material";
import { Box, Button, Card, Divider, IconButton, TextField, Typography } from "@mui/material";

const cards = [
  { id: 1, title: "درآمد", value: "۵۰,۰۰۰,۰۰۰ تومان", icon: <AttachMoneyRounded fontSize="inherit" color="inherit" /> },
  { id: 2, title: "تعداد فروش", value: "23", icon: <AddCardRounded fontSize="inherit" color="inherit" /> },
  { id: 3, title: "تاریخ", value: "1404/10/20", icon: <CalendarMonthRounded fontSize="inherit" color="inherit" /> },
  { id: 4, title: "فروش ماهانه", value: "23", icon: <AddCardRounded fontSize="inherit" color="inherit" /> },

]

const BarChartData = [
  { area: 1, count: 3 },
  { area: 2, count: 5 },
  { area: 3, count: 2 },
  { area: 4, count: 8 },
  { area: 5, count: 6 },
  { area: 6, count: 4 },
  { area: 7, count: 7 },
  { area: 8, count: 5 },
  { area: 9, count: 9 },
  { area: 10, count: 6 },
  { area: 11, count: 4 },
  { area: 12, count: 8 },
  { area: 13, count: 7 },
  { area: 14, count: 5 },
  { area: 15, count: 9 },
  { area: 16, count: 6 },
  { area: 17, count: 4 },
  { area: 18, count: 8 },
  { area: 19, count: 20 },
  { area: 20, count: 5 },
  { area: 21, count: 9 },
]



export default function Home() {


  return (
    <PageLayout>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between py-2 gap-2 lg:gap-4 ">
        {cards.map((card) => (
          <Card key={card.id} className="w-full p-4 bg-white rounded-lg shadow-md relative flex items-center justify-between">
            <div className={`absolute w-1 right-0 top-0 bottom-0 bg-blue-400 ${card.id === 1 ? 'block' : 'hidden'}`}></div>
            <div className="">
              <Typography variant="h6" className="mb-2 text-gray-700">{card.title}</Typography>
              <Typography variant="h6" className="font-bold!" color="primary.dark">{card.value}</Typography>
            </div>
            <IconButton size="" className="bg-blue-100 text-blue-500!">
              {card.icon}
            </IconButton>
          </Card>
        ))}
      </Box>

      {/* bar chart and add product boxs */}
      <Box className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 h-150 lg:h-100 mt-4">

        <Box className="flex flex-col gap-4 ">
          <Button variant="contained" color="primary" className="h-full w-full" >اضافه کردن فرش</Button>
          <Button variant="outlined" color="primary" className="h-full w-full" >مشاهده فرش ها</Button>
        </Box>

        <Box className="flex flex-col gap-4">
          <Button variant="contained" color="primary" className="h-full w-full" >اضافه کردن تابلو</Button>
          <Button variant="outlined" color="primary" className="h-full w-full" >مشاهده تابلو ها</Button>
        </Box>

        <Box className="col-span-full lg:col-span-4 shadow-lg border border-gray-100 rounded-lg p-6 " dir="ltr">
          <BarChartView data={BarChartData} />
        </Box>
      </Box>


      {/* area chart */}
      <Box></Box>
      <Divider className="my-4!" />
      <AreaChartComponent />



    </PageLayout>
  );
}
