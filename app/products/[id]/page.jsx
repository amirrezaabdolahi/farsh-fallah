"use client"
import BackWhereCome from '@/components/BackWhereCome'
import PageLayout from '@/components/PageLayout'
import { productsData } from '@/utils/mokaProducts'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

const ProductDetailsPage =  ({ params }) => {

    const { id } =  params
    const product = productsData.find(p => p.id === Number(id))
    const [preview, setPreview] = useState('https://cdn.shopify.com/s/files/1/0309/9262/9899/files/celestine-soft-blue-v2-A-RC-NU010-69.jpg?v=1742921945&width=640')


    const handleImageChange = (e) => {
        const selected = e.target.files?.[0]
        if (!selected) return

        setFile(selected)
        setPreview(URL.createObjectURL(selected))
    }

    return (
        <PageLayout>
            <BackWhereCome />

            <Box className="flex items-center justify-center" >
                <Box className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
                    <Box>
                        <TextField variant='outlined' label="نام محصول" />
                        <Box>
                            <Box>
                                <TextField variant='outlined' label="نوع" />
                                <TextField variant='outlined' label="جنس" />
                            </Box>
                            <TextField variant='outlined' label="شاخه" />
                        </Box>
                        <TextField multiline rows={3} variant='outlined' label="توضیحات" />
                        <Box>
                            <TextField variant='outlined' label="قیمت خرید" />
                            <TextField variant='outlined' label="قیمت فروش" />
                        </Box>
                    </Box>
                    <Box className="mx-auto border-dashed border-gray-400 border-2 p-2 rounded-lg w-90 h-80 flex items-center justify-center flex-col " >
                        {preview ? (
                            <Box className="w-full h-full overflow-hidden rounded-lg object-cover">
                                <img src={preview} alt='preview image' className='w-full h-full' />
                            </Box>
                        ) : (
                            <>
                                <CloudUploadRounded fontSize='large' className='text-gray-500' />
                                <Typography variant='subtitle1' className='text-gray-500'>
                                    بارگذاری یک تصویر
                                </Typography>
                                <Typography variant='subtitle2' className='text-gray-500'>
                                    یک تصویر با اندازه 300px * 300px یا بزرگتر و تا 1 مگابایت
                                </Typography>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </PageLayout>
    )
}

{/* <Box className="object-cover ">
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/0309/9262/9899/files/celestine-soft-blue-v2-A-RC-NU010-69.jpg?v=1742921945&width=640" alt={product?.name} />
                    </Box>
                    <Box>
                        <Typography variant='h6'>
                            {product?.name}
                        </Typography>
                        <Typography variant='body1'>
                            {product?.category}
                        </Typography>
                        <Typography variant='body1'>
                            {product?.price.toLocaleString()} - {product?.unitprice.toLocaleString()}
                        </Typography>
                        <Typography variant='body1'>
                            تعداد فروش : {product?.sales}
                        </Typography>
                        <Typography variant='body1'>
                            {product?.date}
                        </Typography>
                    </Box> */}

export default ProductDetailsPage