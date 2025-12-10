import CustomerForm from '@/components/fomrs/CustomerForm'
import PageLayout from '@/components/PageLayout'
import ProductSelect from '@/components/product/SelectProduct'
import { productsData } from '@/utils/mokaProducts'
import { AddRounded, ArrowBackRounded, AttachMoneyRounded, CloseRounded, TrendingUpRounded } from '@mui/icons-material'
import { Avatar, Button, Card, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'

const SalePage = async () => {



    const options = await fetch("https://68beb2079c70953d96ed415e.mockapi.io/products").then(res => res.json())

    return (
        <PageLayout>
            <Box className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4" >
                <Card className='flex flex-col items-center p-4 rounded-lg! w-full' >
                    <Box className="w-full justify-start flex items-center gap-2">
                        <AttachMoneyRounded className='rounded-full' sx={{ bgcolor: "warning.light", width: 40, height: 40, padding: 1, color: 'white' }} />
                        <Typography variant='body1'>
                            جمع فروش ها
                        </Typography>
                    </Box>
                    <Typography variant='h5' className='font-bold!'>
                        ت 230,000
                    </Typography>
                    <Typography variant='caption'>
                        از تمام فروش های ثبت شده
                    </Typography>
                </Card>
                <Card className='flex flex-col items-center p-4 rounded-lg! w-full' >
                    <Box className="w-full justify-start flex items-center gap-2">
                        <TrendingUpRounded className='rounded-full' sx={{ bgcolor: "success.light", width: 40, height: 40, padding: 1, color: 'white' }} />
                        <Typography variant='body1'>
                            سود فروش ها
                        </Typography>
                    </Box>
                    <Typography variant='h5' className='font-bold!'>
                        ت 230,000
                    </Typography>
                    <Typography variant='caption'>
                        از تمام فروش های ثبت شده
                    </Typography>
                </Card>

            </Box>
            <Box className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4" >
                <Card className='p-4 rounded-lg! h-max'>

                    <Box className="w-full justify-start flex gap-2">
                        <AddRounded className='rounded-full' sx={{ bgcolor: "primary.main", width: 50, height: 50, padding: 1, color: 'white' }} />
                        <Box className="flex-col flex items-start gap-0">
                            <Typography variant='body1'>
                                اضافه کردن فروش جدید
                            </Typography>
                            <Typography variant='body2'>
                                تمام فیلد های زیر رو برای ایجاد یک فروش پر کنید
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="flex flex-col gap-2 mt-2">
                        <Typography variant='subtitle1'>محصول</Typography>
                        <ProductSelect options={Array.isArray(options) ? options : []} />
                        <Box className="flex gap-2 w-full">
                            <TextField label="تعداد" variant='outlined' className='w-full' />
                            <TextField label="تاریخ" variant='outlined' className='w-full' defaultValue={new Date().toLocaleDateString()} />
                        </Box>
                        <TextField variant='outlined' label="کد تخفیف"/>
                        <Typography variant='subtitle1'>مشخصات مشتری</Typography>

                        <CustomerForm />
                        <TextField
                            label="توضیحات"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                        />
                        <Box className="flex gap-2">
                            <Button variant='contained' className='w-full' size='large' >
                                ذخیره
                            </Button>
                            <Button variant='contained' color='error' size='large' >
                                <CloseRounded />
                            </Button>
                        </Box>
                    </Box>

                </Card>
                <Card className='rounded-lg! p-4 overflow-y-scroll! h-200 '>
                    <Box className="w-full flex items-center justify-between ">
                        <Typography variant='subtitle1'>تاریخچه فروش</Typography>
                        <Link href={"/sale/history"} className='text-sm text-blue-700'>مشاهده همه <ArrowBackRounded /> </Link>
                    </Box>
                    <Box className="grid grid-cols-3 text-center items-center justify-between py-2 rounded-lg mb-2 text-white sticky z-50 top-0 " bgcolor={'primary.main'}>
                        <Typography variant='subtitle1' fontWeight={'bold'} >محصول</Typography>
                        <Typography variant='subtitle1' fontWeight={'bold'} >تاریخ</Typography>
                        <Typography variant='subtitle1' fontWeight={'bold'} >قیمت</Typography>
                    </Box>

                    <Box className="flex-col flex gap-2 ">
                        {productsData.map(product => (
                            <Box key={product.id} className='w-full rounded-xl! border border-gray-200 py-4 px-6 flex items-center justify-between'>
                                <Box className="flex items-center gap-2">
                                    <Avatar src='https://mui.com/static/images/avatar/1.jpg'>P</Avatar>
                                    <span>
                                        <Typography variant='subtitle1'>{product.name}</Typography>
                                        <Typography variant='subtitle2' fontSize={12} color='info' >{product.id}</Typography>
                                    </span>
                                </Box>
                                <Typography variant='subtitle1'>{product.date}</Typography>
                                <Typography variant='subtitle1'>{product.price.toLocaleString("fa-IR")} تومان</Typography>
                            </Box>
                        ))}
                    </Box>



                </Card>
            </Box>
        </PageLayout>
    )
}

export default SalePage