"use client";
import { fetchProducts } from "@/utils/fetchProducts";
import { Box, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const SearchProducts = ({ setItems , items }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        console.log(value);
        console.log(results);

        if (!value.trim() || value.trim().length < 2) {
            setResults([]);
            return;
        }

        try {
            const data = await fetchProducts({ search: value.trim() });
            setResults(data.results ?? []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="p-4 rounded-lg!">
            <Typography variant="body1" gutterBottom>
                جستجوی محصول
            </Typography>

            <TextField
                variant="outlined"
                size="small"
                label="جستجو"
                placeholder="کد یا نام محصول"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
            />

            <Box className="mt-4 h-100 overflow-y-auto">
                {results.map((product) => (
                    <ProductCard key={product.id} product={product} setItems={setItems} items={items} />
                ))}
            </Box>
        </Card>
    );
};

export default SearchProducts;
