"use client";

import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Button,
    Card,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { CloudUploadRounded, SaveRounded } from "@mui/icons-material";
import { validateProductForm } from "@/utils/validators";
import {
    carpetCategories,
    materials,
    productTypes,
} from "@/utils/productDetail";
import { toast } from "react-toastify";

const EditForm = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(product?.image || null);

    const [formData, setFormData] = useState({
        name: product?.name ?? "",
        image: product?.image ?? null,
        description: product?.description ?? "",
        type: productTypes.find((t) => t.value === product?.type) || null,
        crop_sex: product?.crop_sex ?? null,
        branch: product?.branch ?? null,
        unit_price: product?.unit_price ?? "",
        sale_price: product?.sale_price ?? "",
        serial_number: product?.serial_number || "",
        size: product?.size || "",
        width: product?.width || "",
        length: product?.length || "",
    });
    // جلوگیری از memory leak
    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);

        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = async () => {
        const { isValid, errors } = validateProductForm(formData);

        if (!isValid) {
            setErrors(errors);
            console.log(errors);
            return;
        }

        setErrors({});
        setLoading(true);

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("serial_number", formData.serial_number ?? "");
        payload.append("description", formData.description);
        payload.append("type", formData.type?.value ?? "");
        payload.append("crop_sex", formData.crop_sex ?? "");
        payload.append("branch", formData.branch ?? "");
        payload.append("unit_price", Number(formData.unit_price));
        payload.append("sale_price", Number(formData.sale_price));

        // Optional fields based on type
        if (formData.type === productTypes[0]) {
            payload.append("size", formData.size ?? "");
        } else {
            payload.append("width", formData.width ?? "");
            payload.append("length", formData.length ?? "");
        }

        if (formData.image instanceof File) {
            payload.append("image", formData.image);
        }

        try {
            const res = await fetch(`/api/products/${product.id}`, {
                method: "PUT",
                body: payload,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                toast.error("خطا در به‌روزرسانی محصول");
                return;
            }

            toast.success("محصول با موفقیت به‌روزرسانی شد");
        } catch (err) {
            toast.error("خطا در به‌روزرسانی محصول");
        } finally {
            setLoading(false);
        }
    };

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

                    <TextField
                        label="شماره شناسه"
                        name="serial_number"
                        size="small"
                        value={formData.serial_number}
                        onChange={handleFormDataChange}
                        error={Boolean(errors.serial_number)}
                        helperText={errors.serial_number}
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
                                <TextField
                                    {...params}
                                    label="نوع"
                                    size="small"
                                    error={!!errors.type}
                                />
                            )}
                        />

                        <Autocomplete
                            className="w-full"
                            options={materials}
                            value={formData.crop_sex}
                            onChange={(_, v) =>
                                setFormData((p) => ({ ...p, crop_sex: v }))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="جنس"
                                    size="small"
                                    error={!!errors.crop_sex}
                                />
                            )}
                        />
                    </Box>

                    <Autocomplete
                        options={carpetCategories}
                        value={formData.branch}
                        onChange={(_, v) =>
                            setFormData((p) => ({ ...p, branch: v }))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="طرح"
                                size="small"
                                error={!!errors.branch}
                            />
                        )}
                    />
                    {formData.type === productTypes[0] ? (
                        <Autocomplete
                            options={[
                                { id: 1.5, label: "زرع و نیم" },
                                { id: 3, label: "قالیچه" },
                                { id: 6, label: "6 متری" },
                                { id: 9, label: "9 متری" },
                                { id: 12, label: "12 متری" },
                            ]}
                            value={formData.size || null}
                            disabled={!formData.type}
                            // تغییر از branch به size برای هماهنگی
                            onChange={(_, v) =>
                                setFormData((p) => ({ ...p, size: v }))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="اندازه"
                                    size="small"
                                    error={!!errors.size}
                                />
                            )}
                        />
                    ) : formData.type === productTypes[1] ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <TextField
                                label="طول"
                                name="width" // نام متفاوت برای طول
                                size="small"
                                type="number"
                                placeholder="مثلا 200"
                                value={formData.width}
                                onChange={handleFormDataChange}
                                error={Boolean(errors.width)}
                                fullWidth
                            />
                            <TextField
                                label="عرض"
                                name="length" // نام متفاوت برای عرض
                                size="small"
                                type="number"
                                placeholder="مثلا 300"
                                value={formData.length}
                                onChange={handleFormDataChange}
                                error={Boolean(errors.length)}
                                fullWidth
                            />
                        </div>
                    ) : null}

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
                            name="unit_price"
                            size="small"
                            type="number"
                            value={formData.unit_price}
                            onChange={handleFormDataChange}
                            error={Boolean(errors.unit_price)}
                            helperText={errors.unit_price}
                            fullWidth
                        />

                        <TextField
                            label="قیمت فروش"
                            name="sale_price"
                            size="small"
                            type="number"
                            value={formData.sale_price}
                            onChange={handleFormDataChange}
                            error={Boolean(errors.sale_price)}
                            helperText={errors.sale_price}
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
                        className="cursor-pointer w-full h-full flex flex-col gap-2 items-center justify-center"
                    >
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {errors.image && (
                                    <Typography variant="body1" color="error">
                                        {errors.image}
                                    </Typography>
                                )}
                            </>
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
    );
};

export default EditForm;
