"use client"

import BackWhereCome from '@/components/BackWhereCome'
import PageLayout from '@/components/PageLayout'
import { styled } from '@mui/material/styles';
import { Autocomplete, Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { CloudUploadRounded } from '@mui/icons-material';




const AddProductPage = () => {

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [productType, setProductType] = useState(productTypes[0].label)
    const [productTypeInputValue, setProductTypeInputValue] = useState('')
    const fileInput = useRef(null)

    const handleImageChange = (e) => {
        const selected = e.target.files?.[0]
        if (!selected) return

        setFile(selected)
        setPreview(URL.createObjectURL(selected))
    }

    return (
        <PageLayout>
            <BackWhereCome />

            <Card className='text-center w-max mx-auto p-4'>
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

                <input type="file" className='hidden' ref={fileInput} accept='image/*' onChange={handleImageChange} />

                <Box className="flex flex-col  gap-2">
                    <Button className='w-full mt-4! mb-4!' color='warning' onClick={() => { fileInput.current?.click() }} variant='contained' >بارگذاری عکس</Button>
                    <TextField variant='outlined' label="نام محصول" size='small'></TextField>
                    <Box className="flex gap-2">
                        <TextField variant='outlined' type='number' label="قیمت خرید" size='small'></TextField>
                        <TextField variant='outlined' type='number' label="قیمت فروش" size='small'></TextField>
                    </Box>
                    <TextField
                        label="توضیحات"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                    />
                    <Autocomplete
                        disablePortal
                        options={productTypes}
                        value={productType}
                        inputValue={productTypeInputValue}
                        onInputChange={(e, newValue) => { setProductTypeInputValue(newValue) }}
                        size='small'
                        className='w-full!'
                        sx={{ width: 300 }}
                        onChange={(e, newValue) => { setProductType(newValue) }}
                        renderInput={(params) => <TextField {...params} label="نوع محصول" />}
                    />
                    <Box className="flex gap-2">
                        <Autocomplete
                            disablePortal
                            options={carpetCategories}
                            size='small'
                            className='w-full!'
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="طرح" />}
                        />
                        <Autocomplete
                            disablePortal
                            options={["ابریشم", "نمیدونم اینو"]}
                            size='small'
                            className='w-full!'
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="جنس" />}
                        />
                    </Box>
                    <Button variant='contained' className='w-full'>ثبت</Button>
                </Box>
            </Card>

        </PageLayout>
    )
}

export const carpetCategories = [
    { id: 1, label: "تبریز" },
    { id: 2, label: "ناین" },
    { id: 3, label: "قشقایی" },
    { id: 4, label: "اراک" },
    { id: 5, label: "قم" },
    { id: 6, label: "ترکمن" },
    { id: 7, label: "اصفهان" },
    { id: 8, label: "سارق" },
    { id: 9, label: "عشایر" },
    { id: 10, label: "بختیار" },
    { id: 11, label: "اردکان" },
    { id: 12, label: "کاشان" },
    { id: 13, label: "کاشم" },
    { id: 14, label: "هود بیرجند" },
    { id: 15, label: "ابریشم طرح قم" },
    { id: 16, label: "غیره" },
];
export const productTypes = [
    { id: 1, label: 'فرش' },
    { id: 2, label: 'تابلو' }
]


export default AddProductPage