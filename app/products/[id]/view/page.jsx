import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Stack,
    Divider,
    Box,
} from "@mui/material";
import PageLayout from "@/components/PageLayout";
import BackWhereCome from "@/components/BackWhereCome";
import ProductViewCard from "./ProductViewCard";

const ProductView = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.BACKEND_API_URL}api/products/${id}`);
    const product = await res.json();

    if (!product) {
        return (
            <Typography variant="h6" color="error">
                محصول یافت نشد!!!
            </Typography>
        );
    }

    return (
        <PageLayout>
            <BackWhereCome />
            <Box className="w-full h-full flex items-center justify-center">
               <ProductViewCard product={product} />
            </Box>
        </PageLayout>
    );
};

export default ProductView;
