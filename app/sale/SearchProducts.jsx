"use client";
import { fetchProducts } from "@/utils/fetchProducts";
import { Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const SearchProducts = ({ setItems }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!searchTerm) {
            setProducts([]);
            return;
        }

        if (!value.trim()) {
            setProducts([]);
            return;
        }

        try {
            const res = await fetchProducts({ search: searchTerm });
            const data = await res;
            setProducts(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="p-4">
            <Typography variant="body1" gutterBottom>
                جستجوی محصول
            </Typography>

            <TextField
                variant="outlined"
                size="small"
                label="جستجوی"
                placeholder="کد یا نام محصول"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
            />

            {products.map((product) => (
                <Typography key={product.id}>{product.name}</Typography>
            ))}
        </Card>
    );
};

export default SearchProducts;
