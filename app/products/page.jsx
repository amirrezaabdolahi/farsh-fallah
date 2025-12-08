import PageLayout from '@/components/PageLayout'
import Product from '@/components/product/Product'
import { AddRounded, DangerousRounded, DataThresholdingRounded, DeleteRounded, Edit, EditRounded, Inventory2Rounded, RemoveRedEyeRounded, ShowChartRounded, TrendingDownRounded, TrendingUpRounded, VerifiedRounded, ViewDayRounded } from '@mui/icons-material'
import { Avatar, Button, Card, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'

const productsData = [
    { id: 1, name: "فرش تبریز", date: "2024-01-25", category: "فرش دستباف", sales: 150, price: 5000000 },
    { id: 2, name: "فرش کاشان", date: "2024-01-25", category: "فرش ماشینی", sales: 200, price: 3500000 },
    { id: 3, name: "فرش مشهد", date: "2024-01-25", category: "فرش دستباف", sales: 120, price: 4200000 },
    { id: 4, name: "فرش اصفهان", date: "2024-01-25", category: "فرش ماشینی", sales: 180, price: 2800000 },
    { id: 5, name: "فرش قم", date: "2024-01-25", category: "فرش دستباف", sales: 95, price: 6500000 },
    { id: 6, name: "فرش یزد", date: "2024-01-10", category: "فرش ماشینی", sales: 220, price: 2400000 },
    { id: 7, name: "فرش سنندج", date: "2024-02-18", category: "فرش دستباف", sales: 140, price: 5300000 },
    { id: 8, name: "فرش کرمان", date: "2024-03-05", category: "فرش ماشینی", sales: 260, price: 3100000 },
    { id: 9, name: "فرش شیراز", date: "2024-04-08", category: "فرش دستباف", sales: 110, price: 4800000 },
    { id: 10, name: "فرش بابل", date: "2024-05-12", category: "فرش ماشینی", sales: 190, price: 3300000 },
    { id: 11, name: "فرش اردبیل", date: "2024-06-01", category: "فرش دستباف", sales: 130, price: 5900000 },
    { id: 12, name: "فرش زنجان", date: "2024-06-20", category: "فرش ماشینی", sales: 240, price: 2800000 },
    { id: 13, name: "فرش بوکان", date: "2024-07-03", category: "فرش دستباف", sales: 105, price: 5200000 },
    { id: 14, name: "فرش رشت", date: "2024-07-25", category: "فرش ماشینی", sales: 210, price: 3000000 },

]


const Products = () => {
    return (
        <PageLayout>
            <Card className='w-full rounded-xl! overflow-hidden border border-gray-200 flex items-center justify-between shadow-lg px-6 py-4'>
                <Box className="flex items-center gap-2">
                    <Box sx={{ backgroundColor: 'success.light', color: 'white', padding: 2, }} className='rounded-2xl' >
                        <DataThresholdingRounded />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1'>
                            بیشترین فروش
                        </Typography>
                        <Typography variant='body1' className='font-bold!'>
                            فرش تبریز
                        </Typography>
                    </Box>
                </Box>
                <Box className="flex items-center gap-2">
                    <Box sx={{ backgroundColor: 'primary.light', color: 'white', padding: 2, }} className='rounded-2xl' >
                        <TrendingUpRounded />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1'>
                            بالاترین سود
                        </Typography>
                        <Typography variant='body1' className='font-bold!'>
                            فرش تبریز
                        </Typography>
                    </Box>
                </Box>
                <Box className="flex items-center gap-2">
                    <Box sx={{ backgroundColor: 'error.light', color: 'white', padding: 2, }} className='rounded-2xl' >
                        <TrendingDownRounded />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1'>
                            کم ترین فروش
                        </Typography>
                        <Typography variant='body1' className='font-bold!'>
                            فرش کیش
                        </Typography>
                    </Box>
                </Box>
                <Box className="flex items-center gap-2">
                    <Box sx={{ backgroundColor: 'success.light', color: 'white', padding: 2, }} className='rounded-2xl' >
                        <VerifiedRounded />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1'>
                            موجودی
                        </Typography>
                        <Typography variant='body1' className='font-bold!'>
                            3,000
                        </Typography>
                    </Box>
                </Box>
                <Box className="flex items-center gap-2">
                    <Box sx={{ backgroundColor: 'warning.light', color: 'white', padding: 2, }} className='rounded-2xl' >
                        <DangerousRounded />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1'>
                            ناموجود
                        </Typography>
                        <Typography variant='body1' className='font-bold!'>
                            26
                        </Typography>
                    </Box>
                </Box>
            </Card>

            <Box className="flex w-full items-center justify-between mt-8 mb-4">
                <Box>
                    <Typography variant='h5' className='font-bold!'>
                        محصولات
                    </Typography>
                </Box>
                <Box className="flex items-center gap-4">
                    <TextField label="جستجو محصولات" variant="outlined" size="small" />
                    <Link href="products/add"><Button variant='contained' endIcon={<AddRounded />}>افزودن محصول</Button></Link>
                    <Button variant='contained' color='warning' >ثبت فروش</Button>
                </Box>
            </Box>

            {/* filters */}

            <Box className="flex items-center gap-2" sx={{ color: 'primary.main', fontSize: 16 }}>
                <Link href={"#"} className="" >ابریشم طرح قم</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >تبریز</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >ناین</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >هود بیرجند</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >قشقایی</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >اراک</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >قم</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >ترکمن</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >اصفهان</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >سارق</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >عشایر</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >بختیار</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >اردکان</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >کاشان</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >کاشم</Link>
                <Typography variant='body1'>/</Typography>
                <Link href={"#"} className="" >غیره</Link>
            </Box>

            {/* tabel head */}
            <Card className='w-full rounded-lg! shadow-lg border border-gray-200 py-4 px-6 flex items-center justify-between'>
                <Checkbox className='m-0! p-0!'></Checkbox>
                <Typography variant='subtitle1' fontWeight={'bold'} >محصولات</Typography>
                <Typography variant='subtitle1' fontWeight={'bold'} >تاریخ</Typography>
                <Typography variant='subtitle1' fontWeight={'bold'} >دسته‌بندی</Typography>
                <Typography variant='subtitle1' fontWeight={'bold'} >فروش ها</Typography>
                <Typography variant='subtitle1' fontWeight={'bold'} >قیمت</Typography>
                <Typography variant='subtitle1' fontWeight={'bold'} >اقدامات</Typography>
            </Card>
            <Box className="flex flex-col gap-2 mt-2">
                {productsData.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>


        </PageLayout>
    )
}

export default Products