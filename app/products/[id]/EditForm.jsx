"use client"

import React, { useEffect, useState } from "react"
import {
    Autocomplete,
    Button,
    Card,
    TextField,
    Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { CloudUploadRounded, SaveRounded } from "@mui/icons-material"
import { carpetCategories, productTypes } from "../add/page"
import { validateProductForm } from "@/utils/validators"

const FALLBACK_IMAGE =
    "https://cdn.shopify.com/s/files/1/0309/9262/9899/files/celestine-soft-blue-v2-A-RC-NU010-69.jpg?v=1742921945&width=640"

const EditForm = ({ product }) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [preview, setPreview] = useState(product?.img ?? FALLBACK_IMAGE)

    const [formData, setFormData] = useState({
        name: product?.name ?? "",
        img: product?.img ?? FALLBACK_IMAGE,
        description: product?.description ?? "",
        type: product?.type ?? null,
        material: product?.material ?? null,
        category: product?.category ?? null,
        unitprice: product?.unitprice ?? "",
        price: product?.price ?? "",
        sales: product?.sales ?? 0,
    })

    // جلوگیری از memory leak
    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview)
            }
        }
    }, [preview])

    const handleFormDataChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreview(url)

        setFormData((prev) => ({
            ...prev,
            img: file,
        }))
    }

    const handleSubmit = async () => {
        const { isValid, errors } = validateProductForm(formData)

        if (!isValid) {
            setErrors(errors)
            return
        }

        setErrors({})
        setLoading(true)

        const payload = new FormData()
        payload.append("name", formData.name)
        payload.append("description", formData.description)
        payload.append("type", formData.type.label)
        payload.append("material", formData.material)
        payload.append("category", formData.category)
        payload.append("unitprice", Number(formData.unitprice))
        payload.append("price", Number(formData.price))
        payload.append("sales", Number(formData.sales))

        if (formData.img instanceof File) {
            payload.append("img", formData.img)
        }

        try {
            // const res = await fetch(`/api/products/${product.id}/`, {
            //     method: "PUT",
            //     body: payload,
            // })

            // if (!res.ok) throw new Error("Save failed")

            for (const [key, value] of payload.entries()) {
                console.log(key, value)
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className="flex items-center justify-center">
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                {/* ---------- FORM ---------- */}
                <Card className="flex flex-col gap-6 p-4">

                    <TextField
                        label="نام محصول"
                        name="name"
                        size="small"
                        value={formData.name}
                        onChange={handleFormDataChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />

                    <Box className="flex gap-2 w-full">
                        <Autocomplete
                            className="w-full"
                            options={productTypes}
                            value={formData.type}
                            onChange={(_, v) =>
                                setFormData((p) => ({ ...p, type: v }))
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="نوع" size="small" error={!!errors.type} />
                            )}
                        />

                        <Autocomplete
                            className="w-full"
                            options={["ابریشم", "پشم", "اکریلیک"]}
                            value={formData.material}
                            onChange={(_, v) =>
                                setFormData((p) => ({ ...p, material: v }))
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="جنس" size="small" error={!!errors.material} />
                            )}
                        />
                    </Box>

                    <Autocomplete
                        options={carpetCategories}
                        value={formData.category}
                        onChange={(_, v) =>
                            setFormData((p) => ({ ...p, category: v }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="طرح" size="small" error={!!errors.category} />
                        )}
                    />

                    <TextField
                        label="توضیحات"
                        name="description"
                        size="small"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleFormDataChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />

                    <Box className="flex gap-2">
                        <TextField
                            label="قیمت خرید"
                            name="unitprice"
                            size="small"
                            type="number"
                            value={formData.unitprice}
                            onChange={handleFormDataChange}
                            error={Boolean(errors.unitprice)}
                            helperText={errors.unitprice}
                            fullWidth
                        />

                        <TextField
                            label="قیمت فروش"
                            name="price"
                            size="small"
                            type="number"
                            value={formData.price}
                            onChange={handleFormDataChange}
                            error={Boolean(errors.price)}
                            helperText={errors.price}
                            fullWidth
                        />
                    </Box>

                    <Button
                        variant="contained"
                        endIcon={<SaveRounded />}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "در حال ذخیره..." : "ذخیره محصول"}
                    </Button>
                </Card>

                {/* ---------- IMAGE ---------- */}
                <Box className="border-dashed border-2 border-gray-400 rounded-lg p-3 flex items-center justify-center">
                    <input
                        type="file"
                        hidden
                        id="upload-image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <label
                        htmlFor="upload-image"
                        className="cursor-pointer w-full h-full flex items-center justify-center"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <Box className="flex flex-col items-center gap-2 text-gray-500">
                                <CloudUploadRounded fontSize="large" />
                                <Typography>بارگذاری تصویر</Typography>
                                <Typography variant="caption">
                                    حداقل 300×300 – حداکثر 1MB
                                </Typography>
                            </Box>
                        )}
                    </label>
                </Box>

            </Box>
        </Box>
    )
}

export default EditForm
