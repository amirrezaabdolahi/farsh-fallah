
import AreaChartView from "@/components/charts/AreaChart";
import BarChartView from "@/components/charts/BarChart";
import BarChart from "@/components/charts/BarChart";
import ChartFiterComponent from "@/components/charts/ChartFiterComponent";
import PageLayout from "@/components/PageLayout";
import { AddCardRounded, AttachMoneyRounded } from "@mui/icons-material";
import { Autocomplete, Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";

const cards = [
  { id: 1, title: "درامد ماهانه", value: "۵۰,۰۰۰,۰۰۰ تومان", icon: <AttachMoneyRounded fontSize="inherit" color="inherit" /> },
  { id: 2, title: "فروش ماهانه", value: "23", icon: <AddCardRounded fontSize="inherit" color="inherit" /> },
  { id: 3, title: "فروش ماهانه", value: "23", icon: <AddCardRounded fontSize="inherit" color="inherit" /> },
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

const AreaChartData = [
  { date: "2025-01-01", price: 200 },
  { date: "2025-01-02", price: 189 },
  { date: "2025-01-03", price: 240 },
  { date: "2025-01-04", price: 175 },
  { date: "2025-01-05", price: 260 },
  { date: "2025-01-06", price: 198 },
  { date: "2025-01-07", price: 221 },
  { date: "2025-01-08", price: 243 },
  { date: "2025-01-09", price: 210 },
  { date: "2025-01-10", price: 170 },
  { date: "2025-01-11", price: 192 },
  { date: "2025-01-12", price: 260 },
  { date: "2025-01-13", price: 228 },
  { date: "2025-01-14", price: 245 },
  { date: "2025-01-15", price: 267 },
  { date: "2025-01-16", price: 199 },
  { date: "2025-01-17", price: 181 },
  { date: "2025-01-18", price: 234 },
  { date: "2025-01-19", price: 251 },
  { date: "2025-01-20", price: 223 },
  { date: "2025-01-21", price: 177 },
  { date: "2025-01-22", price: 190 },
  { date: "2025-01-23", price: 260 },
  { date: "2025-01-24", price: 210 },
  { date: "2025-01-25", price: 230 },
  { date: "2025-01-26", price: 188 },
  { date: "2025-01-27", price: 206 },
  { date: "2025-01-28", price: 255 },
  { date: "2025-01-29", price: 242 },
  { date: "2025-01-30", price: 268 }
];


export default function Home() {


  return (
    <PageLayout>
      <Box className="flex items-center justify-between py-2 gap-4 ">
        {cards.map((card) => (
          <Card key={card.id} className="w-full p-4 mb-4 bg-white rounded-lg shadow-md relative flex items-center justify-between">
            <div className={`absolute w-1 right-0 top-0 bottom-0 bg-blue-400 ${card.id === 1 ? 'block' : 'hidden'}`}></div>
            <div className="">
              <Typography variant="h6" className="mb-2 text-gray-700">{card.title}</Typography>
              <Typography variant="h4" className="font-bold!" color="primary.dark">{card.value}</Typography>
            </div>
            <IconButton size="large" className="bg-blue-100 text-blue-500!">
              {card.icon}
            </IconButton>
          </Card>
        ))}
      </Box>

      {/* bar chart and add product boxs */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-90 mt-4">

        <Box className="flex flex-col gap-4">
          <Button variant="contained" color="primary" className="h-full w-full" >اضافه کردن فرش</Button>
          <Button variant="outlined" color="primary" className="h-full w-full" >مشاهده فرش ها</Button>
        </Box>

        <Box className="flex flex-col gap-4">
          <Button variant="contained" color="primary" className="h-full w-full" >اضافه کردن تابلو</Button>
          <Button variant="outlined" color="primary" className="h-full w-full" >مشاهده تابلو ها</Button>
        </Box>

        <Box className="col-span-2 shadow-lg border border-gray-100 rounded-lg p-6 " dir="ltr">
          <BarChartView data={BarChartData} />
        </Box>
      </Box>


      {/* area chart */}
      <Box className="w-full p-2 shadow-md rounded-lg flex items-center mt-4 border border-gray-100">
        <ChartFiterComponent />
      </Box>
      <Box className="mt-4 w-full h-100 shadow-lg p-6 pl-0 rounded-lg" dir="ltr">
        <AreaChartView data={AreaChartData} />
      </Box>



    </PageLayout>
  );
}
