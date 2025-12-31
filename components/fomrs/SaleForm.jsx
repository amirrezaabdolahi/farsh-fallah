"use client";

import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Card,
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
import Image from "next/image";
import { toast } from "react-toastify";

const areas = Array.from({ length: 22 }, (_, i) => i + 1);

const SaleForm = ({ items, setItems }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        name: "",
        province: "",
        city: "",
        area: "",
        address: "",
    });

    const fetchProductsPage = async (pageNumber = 1) => {
        if (loadingProducts || !hasMore) return;

        setLoadingProducts(true);

        try {
            const res = await fetch(`/api/products?page=${pageNumber}`);
            if (!res.ok) {
                toast.error("خطا در دریافت محصولات");
                return;
            }

            const data = await res.json();

            setProducts((prev) =>
                pageNumber === 1 ? data.results : [...prev, ...data.results]
            );
            setHasMore(Boolean(data.next));
            setPage(pageNumber);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchProductsPage(1);
    }, []);

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
    const updateDiscount = (productId, value) => {
        setItems((prev) =>
            prev.map((it) =>
                it.product.id === productId ? { ...it, discount: value } : it
            )
        );
    };

    const selectedProvince = locations.find(
        (p) => p.province === form.province
    );

    const handleSubmit = async () => {
        const { isValid, errors } = validateSaleForm(form, items);

        if (!isValid) {
            setErrors(errors);
            console.log(errors);
            return;
        }

        const payload = {
            customer_name: form.name,
            customer_phone: form.phone,
            customer_city: form.city,
            customer_state: form.province,
            customer_region: form.area,
            customer_address: form.address,
            items: items.map((i) => ({
                product: i.product.id,
                discount: Number(i.discount),
            })),
        };

        setErrors({});
        setLoading(true);

        try {
            const res = await fetch(`/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Token ${process.env.BACKEND_API_TOKEN}`, // اگه نیاز باشه
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                toast.error("خطا در ارسال فرم");
                return;
            }

            const data = await res.json();

            if (data.success) {
                toast.success("فرم با موفقیت ارسال شد");
                setForm({
                    phone: "",
                    name: "",
                    province: "",
                    city: "",
                    area: "",
                    address: "",
                });
                setItems([]);
            }
        } catch (e) {
            toast.error("خطا در ارسال فرم");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log("products length:", products.length);
    }, [products]);

    const handleClear = () => {
        setForm({
            phone: "",
            name: "",
            province: "",
            city: "",
            area: "",
            address: "",
        });
        setItems([]);
    };

    return (
        <Box className="flex flex-col gap-3 mt-2">
            <Typography variant="subtitle1">محصول</Typography>
            <Box>
                <Autocomplete
                    multiple
                    options={products}
                    value={items.map((i) => i.product)}
                    onChange={(_, values) => {
                        setItems((prev) =>
                            values.map((p) => {
                                const existing = prev.find(
                                    (i) => i.product.id === p.id
                                );
                                return existing || { product: p, discount: "" };
                            })
                        );
                    }}
                    getOptionLabel={(o) => o.name}
                    isOptionEqualToValue={(o, v) => o.id === v.id}
                    ListboxProps={{
                        onScroll: (e) => {
                            const listbox = e.currentTarget;
                            if (
                                listbox.scrollTop + listbox.clientHeight >=
                                listbox.scrollHeight - 5
                            ) {
                                if (hasMore && !loadingProducts) {
                                    fetchProductsPage(page + 1);
                                }
                            }
                        },
                    }}
                    renderOption={(props, option) => {
                        const { key, ...otherProps } = props;

                        return (
                            <Box component="li" key={key} {...otherProps}>
                                <Box
                                    key={option.id}
                                    className=" rounded-full overflow-hidden bg-gray-400 ml-2 flex items-center justify-center"
                                    sx={{ width: 24, height: 24 }}
                                >
                                    {option.image ? (
                                        <Image
                                            src={option?.image}
                                            alt={option.name}
                                            quality={30}
                                            className="w-full object-cover"
                                            width={30}
                                            height={30}
                                        />
                                    ) : (
                                        <Typography variant="body2">
                                            {option?.name[0]}
                                        </Typography>
                                    )}
                                </Box>
                                <Typography>{option.name}</Typography>
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="محصول"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingProducts && (
                                            <CachedRounded className="animate-spin" />
                                        )}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </Box>

            <Box className="flex flex-col gap-2">
                {items.length !== 0 ? (
                    <>
                        {items.map((item) => {
                            const maxDiscount = Number(item.product.sale_price);

                            const isInvalid =
                                item.discount !== "" &&
                                (item.discount < 0 ||
                                    item.discount > maxDiscount);

                            return (
                                <Card
                                    key={item.product.id}
                                    className="p-2 border-gray-200! border rounded-lg!"
                                >
                                    <Box className="flex items-center gap-2 mb-2">
                                        <Box
                                            className="rounded-full overflow-hidden bg-gray-400 ml-2 flex items-center justify-center"
                                            sx={{ width: 24, height: 24 }}
                                        >
                                            {item.product.image ? (
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    width={30}
                                                    height={30}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <Typography variant="body2">
                                                    {item.product.name[0]}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Typography>
                                            {item.product.name}
                                        </Typography>
                                    </Box>

                                    <TextField
                                        size="small"
                                        label="تخفیف"
                                        type="number"
                                        value={item.discount}
                                        error={isInvalid}
                                        helperText={
                                            isInvalid
                                                ? `حداکثر تخفیف ${maxDiscount} است`
                                                : ""
                                        }
                                        inputProps={{
                                            min: 0,
                                            max: maxDiscount,
                                        }}
                                        onChange={(e) => {
                                            const raw = e.target.value;

                                            if (raw === "") {
                                                updateDiscount(
                                                    item.product.id,
                                                    ""
                                                );
                                                return;
                                            }

                                            const value = Number(raw);

                                            if (
                                                Number.isNaN(value) ||
                                                value < 0 ||
                                                value > maxDiscount
                                            )
                                                return;

                                            updateDiscount(
                                                item.product.id,
                                                value
                                            );
                                        }}
                                    />
                                </Card>
                            );
                        })}
                    </>
                ) : (
                    <Card className="rounded-lg! flex items-center justify-center py-2">
                        <Typography variant="body2">
                            هیچ محصولی انتخاب نشده
                        </Typography>
                    </Card>
                )}
            </Box>

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
                label="آدرس"
                multiline
                rows={3}
                value={form.address}
                onChange={(e) => setValue("address", e.target.value)}
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

                <Button variant="contained" color="error" onClick={handleClear}>
                    <CloseRounded />
                </Button>
            </Box>
        </Box>
    );
};

export default SaleForm;
