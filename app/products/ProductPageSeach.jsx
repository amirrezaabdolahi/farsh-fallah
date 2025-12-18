"use client";
import {
    AddRounded,
    SearchRounded,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductPageSeach = () => {
    const [search, setSearch] = useState("");
    const router = useRouter()

    const handleSearch = async () => {
        let value = search.trim();
        if (!value) return;

        router.push(`/products?search=${encodeURIComponent(value)}`);
    };

    return (
        <Box className="flex w-full items-center justify-between mt-8 mb-4">
            <Box>
                <Typography variant="h5" className="font-bold!">
                    محصولات
                </Typography>
            </Box>
            <Box className="hidden md:flex items-center gap-4 ">
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        size="small"
                    >
                        جست و جو
                    </InputLabel>
                    <OutlinedInput
                        size="small"
                        id="outlined-adornment-password"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onKeyDown={(e) => {
                            if (e.code == "Enter") handleSearch();
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch} edge="end">
                                    <SearchRounded />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Link href="products/add">
                    <Button variant="contained" endIcon={<AddRounded />}>
                        افزودن محصول
                    </Button>
                </Link>
                <Link href={"sale"}>
                    <Button variant="contained" color="warning">
                        ثبت فروش
                    </Button>
                </Link>
            </Box>
            <Link href={"settings"} className="block md:hidden">
                <Button variant="contained">مشاهده پیشرفته</Button>
            </Link>
        </Box>
    );
};

export default ProductPageSeach;
