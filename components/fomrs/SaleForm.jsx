"use client";

import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { CloseRounded, CachedRounded } from "@mui/icons-material";
import { locations } from "@/utils/locations";
import { validateSaleForm } from "@/utils/validators";

const areas = Array.from({ length: 22 }, (_, i) => i + 1);

const SaleForm = ({ options = [] }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        product: "",
        quantity: 1,
        date: new Date().toISOString().slice(0, 10),
        discount: "",
        phone: "",
        name: "",
        province: "",
        city: "",
        area: "",
        description: "",
    });

    const setValue = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleProvinceChange = (value) => {
        setForm((prev) => ({
            ...prev,
            province: value,
            city: "",
            area: "",
        }));
    };

    const selectedProvince = locations.find(
        (p) => p.province === form.province
    );

    const handleSubmit = () => {
        const { isValid, errors } = validateSaleForm(form);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            
            console.log("SALE PAYLOAD", form);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="flex flex-col gap-3 mt-2">
            <Typography variant="subtitle1">محصول</Typography>

            <FormControl fullWidth error={!!errors.product}>
                <InputLabel>محصول</InputLabel>
                <Select
                    value={form.product}
                    label="محصول"
                    onChange={(e) => setValue("product", e.target.value)}
                >
                    {options.length ? (
                        options.map((o) => (
                            <MenuItem key={o.id} value={o.id}>
                                <Box className="flex items-center gap-2">
                                    <Avatar
                                        src={o.avatar}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Typography>{o.name}</Typography>
                                </Box>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem>
                            <CachedRounded className="animate-spin" />
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            <Box className="flex gap-2">
                <TextField
                    label="تعداد"
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                        setValue("quantity", Number(e.target.value))
                    }
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                    fullWidth
                />

                <TextField
                    label="تاریخ"
                    type="date"
                    value={form.date}
                    onChange={(e) => setValue("date", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>

            <TextField
                label="کد تخفیف"
                value={form.discount}
                onChange={(e) => setValue("discount", e.target.value)}
            />

            <Typography variant="subtitle1">مشخصات مشتری</Typography>

            <TextField
                label="شماره تلفن"
                value={form.phone}
                onChange={(e) => setValue("phone", e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
            />

            <TextField
                label="نام"
                value={form.name}
                onChange={(e) => setValue("name", e.target.value)}
            />

            <Box className="flex gap-2">
                <FormControl fullWidth error={!!errors.province}>
                    <InputLabel>استان</InputLabel>
                    <Select
                        value={form.province}
                        label="استان"
                        onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                        {locations.map((l) => (
                            <MenuItem key={l.province} value={l.province}>
                                {l.province}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    fullWidth
                    disabled={!form.province}
                    error={!!errors.city}
                >
                    <InputLabel>شهر</InputLabel>
                    <Select
                        value={form.city}
                        label="شهر"
                        onChange={(e) => setValue("city", e.target.value)}
                    >
                        {selectedProvince?.cities.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {form.city === "تهران" && (
                    <FormControl fullWidth>
                        <InputLabel>منطقه</InputLabel>
                        <Select
                            value={form.area}
                            label="منطقه"
                            onChange={(e) => setValue("area", e.target.value)}
                        >
                            {areas.map((a) => (
                                <MenuItem key={a} value={a}>
                                    {a}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>

            <TextField
                label="توضیحات"
                multiline
                rows={3}
                value={form.description}
                onChange={(e) => setValue("description", e.target.value)}
            />

            <Box className="flex gap-2">
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "در حال ذخیره..." : "ذخیره"}
                </Button>

                <Button variant="contained" color="error">
                    <CloseRounded />
                </Button>
            </Box>
        </Box>
    );
};

export default SaleForm;
