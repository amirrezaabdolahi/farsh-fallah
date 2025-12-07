import PageLayout from '@/components/PageLayout'
import { AddRounded, DangerousRounded, DataThresholdingRounded, DeleteRounded, Edit, EditRounded, Inventory2Rounded, ShowChartRounded, TrendingDownRounded, TrendingUpRounded, VerifiedRounded } from '@mui/icons-material'
import { Avatar, Button, Card, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const productsData = [
    {
        id: 1,
        name: "فرش تبریز",
        date: "2024-05-01",
        category: "فرش دستباف",
        sales: 150,
        price: "5,000,000 تومان"
    },
    {
        id: 2,
        name: "فرش کاشان",
        date: "2024-04-15",
        category: "فرش ماشینی",
        sales: 200,
        price: "3,500,000 تومان"
    },
    {
        id: 3,
        name: "فرش مشهد",
        date: "2024-03-20",
        category: "فرش دستباف",
        sales: 120,
        price: "4,200,000 تومان"
    },
    {
        id: 4,
        name: "فرش اصفهان",
        date: "2024-02-10",
        category: "فرش ماشینی",
        sales: 180,
        price: "2,800,000 تومان"
    },
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
                    <Button variant='contained' endIcon={<AddRounded />}>افزودن محصول</Button>
                    <Button variant='contained' color='warning' >ثبت فروش</Button>
                </Box>
            </Box>

            <Card className='w-full rounded-lg!'>
                <table className="w-full table-auto border-collapse ">
                    <thead>
                        <tr>
                            <th className=''><Checkbox className='p-0 m-0'></Checkbox></th>
                            <th className=''>محصول</th>
                            <th className=''>تاریخ</th>
                            <th className=''>دسته بندی</th>
                            <th className=''>فروش ها</th>
                            <th className=''>قیمت</th>
                            <th className=''>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map((product) => (
                            <tr key={product.id} className="text-center  border-t border-gray-200 hover:bg-gray-50 h-20">
                                <td><Checkbox className='p-0 m-0'></Checkbox></td>
                                <td className='flex gap-2 items-center justify-start '>
                                    <Avatar variant='rounded'>P</Avatar>
                                    <span className='flex flex-col items-start'>
                                        <Typography variant='subtitle1' className='text-gray-500'>{product.id}</Typography>
                                        <Typography variant='body1'>{product.name}</Typography>
                                    </span>
                                </td>
                                <td>{product.date}</td>
                                <td>{product.category}</td>
                                <td>{product.sales}</td>
                                <td>{product.price}</td>
                                <td>
                                    <IconButton variant='contained' color='primary'>
                                        <EditRounded />
                                    </IconButton>
                                    <IconButton variant='contained' color='error'>
                                        <DeleteRounded />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

        </PageLayout>
    )
}

export default Products