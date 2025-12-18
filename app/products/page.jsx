import PageLayout from "@/components/PageLayout";
import ProductsFilteringView from "@/components/product/ProductsFilteringView";
import { horizontalScrollSx } from "@/components/ui/scrollbar";
import {
    AddRounded,
    DangerousRounded,
    DataThresholdingRounded,
    TrendingDownRounded,
    TrendingUpRounded,
    VerifiedRounded,
} from "@mui/icons-material";
import { Button, Card, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import ProductsClient from "./ProductsClient";
import ProductPageHeader from "./ProductPageHeader";
import ProductPageSeach from "./ProductPageSeach";

const Products = ({ searchParams }) => {
    const branch = searchParams?.branch || "all";
    const type = searchParams?.type || "all";
    const search = searchParams?.search?.trim() || ''

    // const params = new URLSearchParams();

    // if (branch && branch !== "all") {
    //     params.append("branch", branch);
    // }

    // if (type) {
    //     params.append("type", type);
    // }

    // let productsData = [];

    // try {
    //     const res = await fetch(
    //         `${process.env.BACKEND_API_URL}api/products/?${params.toString()}`
    //     );

    //     if (!res.ok) throw new Error("Fetch failed");

    //     const data = await res.json();
    //     productsData = Array.isArray(data?.results) ? data.results : [];
    // } catch (error) {
    //     console.error(error);
    // }

    // const content =
    //     productsData.length === 0 ? (
    //         <Card className="w-full py-4 text-center rounded-lg!">
    //             <Typography>محصولی یافت نشد</Typography>
    //         </Card>
    //     ) : (
    //         productsData.map((product) => (
    //             <Product key={product.id} product={product} />
    //         ))
    //     );

    return (
        <PageLayout>
            
            {/* page header */}
            <ProductPageHeader />

            {/* page search and add product or sale */}

            <ProductPageSeach />

            {/* filters */}

            <ProductsFilteringView branch={branch} />

            {/* tabel head */}
            <Box
                className="w-full h-200 overflow-scroll lg:overflow-auto p-2"
                sx={horizontalScrollSx}
            >
                <Card className="w-200 lg:w-full rounded-lg! sticky top-0 bg-transparent! backdrop-blur-sm z-50 shadow-lg border border-gray-200 py-4 px-6 grid grid-cols-6 items-center justify-between">
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                        محصولات
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                        تاریخ
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                        دسته‌بندی
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                        فروش ها
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                        قیمت
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={"bold"}>
                        اقدامات
                    </Typography>
                </Card>
                <Box className=" w-200 lg:w-full flex flex-col gap-2 mt-2">
                    <Suspense fallback={<ProductsSkeleton />}>
                        <ProductsClient searchParams={{ branch, type , search  }} />
                    </Suspense>
                </Box>
            </Box>
        </PageLayout>
    );
};

export default Products;
