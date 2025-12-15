"use client";
import React, { useState } from "react";
import CustomerForm from "./CustomerForm";
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
import ProductSelect from "../product/SelectProduct";
import { CloseRounded } from "@mui/icons-material";
import { locations } from "@/utils/locations";

const SaleForm = ({ options }) => {
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState(1);
    const [selected, setSelected] = React.useState("");

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
        setCity(""); // ریست شهر وقتی استان عوض می‌شود
    };

    const selectedProvince = locations.find((p) => p.province === province);
    return (
        <Box className="flex flex-col gap-2 mt-2">
            <Typography variant="subtitle1">محصول</Typography>
            <FormControl fullWidth>
                <InputLabel id="product-select-label">محصول</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    value={selected}
                    label="محصول"
                    onChange={handleChange}
                >
                    {options && options.length > 0 ? (
                        options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Avatar
                                        src={option.avatar}
                                        alt={option.name || "unknown"}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Typography variant="body2">
                                        {option.name || "بدون نام"}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="">
                            <CachedRounded className="animate-spin" />
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <Box className="flex gap-2 w-full">
                <TextField
                    label="تعداد"
                    variant="outlined"
                    className="w-full"
                />
                <TextField
                    label="تاریخ"
                    variant="outlined"
                    className="w-full"
                    defaultValue={new Date().toLocaleDateString()}
                />
            </Box>
            <TextField variant="outlined" label="کد تخفیف" />
            <Typography variant="subtitle1">مشخصات مشتری</Typography>

            <TextField placeholder="091256789" label="شماره تلفن" />
            <TextField placeholder="امیررضا عبدالهی" label="نام" />
            <Box className="flex gap-2">
                <FormControl fullWidth>
                    <InputLabel>استان</InputLabel>
                    <Select
                        value={province}
                        label="استان"
                        onChange={handleProvinceChange}
                    >
                        {locations.map((item) => (
                            <MenuItem key={item.province} value={item.province}>
                                {item.province}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* شهر */}
                <FormControl fullWidth disabled={!province}>
                    <InputLabel>شهر</InputLabel>
                    <Select
                        value={city}
                        label="شهر"
                        onChange={(e) => setCity(e.target.value)}
                    >
                        {selectedProvince?.cities.map((city) => (
                            <MenuItem
                                key={`${selectedProvince.province}-${city}`}
                                value={city}
                            >
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* منطقه اگه شهر تهران بود*/}

                {city === "تهران" && (
                    <FormControl fullWidth disabled={!province}>
                        <InputLabel>منطقه</InputLabel>
                        <Select
                            value={area}
                            label="منطقه"
                            onChange={(e) => setArea(e.target.value)}
                        >
                            {areas.map((area) => (
                                <MenuItem key={area} value={area}>
                                    {area}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>
            <TextField
                label="توضیحات"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
            />
            <Box className="flex gap-2">
                <Button variant="contained" className="w-full" size="large">
                    ذخیره
                </Button>
                <Button variant="contained" color="error" size="large">
                    <CloseRounded />
                </Button>
            </Box>
        </Box>
    );
};

export default SaleForm;
