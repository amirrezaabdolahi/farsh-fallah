"use client";

import { AddShoppingCartRounded } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product, setItems, items }) => {
    const handleAddToCart = () => {
        const existingItem = items.find((item) => item.product.id === product.id);
        if (existingItem) {
            toast.error("محصول اضافه شده است");
            return;
        }
        setItems([...items, { product, discount: '' }]);
        toast.success(`محصول ${product.name} به سبد خرید اضافه شد`);
    };
    return (
        <>
            <Card
                key={product.id}
                className="w-full rounded-xl! my-2 border border-gray-200 py-2 px-6 grid grid-cols-2 items-center justify-between"
            >
                <Box className="flex items-center gap-2 grid-cols-1">
                    <Box
                        className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center"
                        bgcolor="lightgray"
                    >
                        {product?.image ? (
                            <Image
                                src={product.image}
                                alt={product?.name || "product image"}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                                quality={50}
                            />
                        ) : (
                            <Typography variant="body1" fontWeight="bold">
                                {product?.name?.[0]?.toUpperCase() || "?"}
                            </Typography>
                        )}
                    </Box>

                    <span>
                        <Typography variant="subtitle1">
                            {product.name}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontSize={12}
                            color="info"
                        >
                            {product.serial_number
                                ? product.serial_number
                                : product.id}
                        </Typography>
                    </span>
                </Box>

                <Box className="flex items-center justify-end grid-cols-1">
                    <IconButton className="" size="" onClick={handleAddToCart}>
                        <AddShoppingCartRounded color="primary" />
                    </IconButton>
                </Box>
            </Card>
        </>
    );
};

export default ProductCard;
