import Product from "@/components/product/Product";
import { Box, Card, Typography } from "@mui/material";
import React from "react";

const ProductsList = async ({ searchParams }) => {
    const { category, type } = await searchParams;

    const params = new URLSearchParams();

    if (category && category !== "all") {
        params.append("branch", category);
    }

    if (type) {
        params.append("type", type);
    }

    const data = await fetch(
        `${process.env.BACKEND_API_URL}api/products/?${params.toString()}`
    ).then((res) => res.json());

    let content = "";

    let productsData = Array.isArray(data?.results) ? data.results : [];

    if (productsData.length <= 0 || !productsData) {
        content = (
            <Card className="w-full py-4 text-center rounded-lg!">
                <Typography variant="body1">محصولی یافت نشد</Typography>
            </Card>
        );
    } else {
        content = productsData?.map((product) => (
            <Product key={product.id} product={product} />
        ));
    }
    return (
        <Box className=" w-200 lg:w-full flex flex-col gap-2 mt-2">
            {content}
        </Box>
    );
};

export default ProductsList;
