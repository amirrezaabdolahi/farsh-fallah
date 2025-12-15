
import PageLayout from '@/components/PageLayout'
import Product from '@/components/product/Product'
import ProductsFilteringView from '@/components/product/ProductsFilteringView'
import { horizontalScrollSx } from '@/components/ui/scrollbar'
import { productsData } from '@/utils/mokaProducts'
import { AddRounded, DangerousRounded, DataThresholdingRounded, DeleteRounded, Edit, EditRounded, Inventory2Rounded, RemoveRedEyeRounded, ShowChartRounded, TrendingDownRounded, TrendingUpRounded, VerifiedRounded, ViewDayRounded } from '@mui/icons-material'
import { Avatar, Breadcrumbs, Button, Card, Checkbox, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'




const Products = async ({ searchParams }) => {

    const { category } = await searchParams
    console.log(category);

    return (
        <PageLayout>
            <Card className='w-full rounded-xl! overflow-hidden border border-gray-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center justify-between shadow-lg px-6 py-4 gap-2'>
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
                <Box className="hidden md:flex items-center gap-4 ">
                    <TextField label="جستجو محصولات" variant="outlined" size="small" />
                    <Link href="products/add">
                        <Button variant='contained' endIcon={<AddRounded />}>افزودن محصول</Button>
                    </Link>
                    <Link href={"sale"}>
                        <Button variant='contained' color='warning' >ثبت فروش</Button>
                    </Link>
                </Box>
                <Link href={"settings"} className='block md:hidden'>
                    <Button variant='contained' >مشاهده پیشرفته</Button>
                </Link>
            </Box>

            {/* filters */}

            <ProductsFilteringView category={category} />

            {/* tabel head */}
            <Box
                className="w-full h-200 overflow-scroll lg:overflow-auto p-2"
                sx={horizontalScrollSx}
            >
                <Card className='w-200 lg:w-full rounded-lg! sticky top-0 bg-transparent! backdrop-blur-sm z-50 shadow-lg border border-gray-200 py-4 px-6 flex items-center justify-between'>
                    <Checkbox className='m-0! p-0!'></Checkbox>
                    <Typography variant='subtitle1' fontWeight={'bold'} >محصولات</Typography>
                    <Typography variant='subtitle1' fontWeight={'bold'} >تاریخ</Typography>
                    <Typography variant='subtitle1' fontWeight={'bold'} >دسته‌بندی</Typography>
                    <Typography variant='subtitle1' fontWeight={'bold'} >فروش ها</Typography>
                    <Typography variant='subtitle1' fontWeight={'bold'} >قیمت</Typography>
                    <Typography variant='subtitle1' fontWeight={'bold'} >اقدامات</Typography>
                </Card>
                <Box className=" w-200 lg:w-full flex flex-col gap-2 mt-2">
                    {productsData.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </Box>
            </Box>


        </PageLayout>
    )
}


export default Products