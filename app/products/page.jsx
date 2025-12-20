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

const Products = async ({ searchParams }) => {
    const branch = searchParams?.branch || "all";
    const type = searchParams?.type || "all";
    const search = searchParams?.search?.trim() || "";

    const data = await fetch(
        `${process.env.BACKEND_API_URL}api/reports/top_products/`
    ).then((res) => res.json());

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
                    <Typography variant="subtitle1" className="text-center" fontWeight={"bold"}>
                        محصولات
                    </Typography>
                    <Typography variant="subtitle1" className="text-center" fontWeight={"bold"}>
                        تاریخ
                    </Typography>
                    <Typography variant="subtitle1" className="text-center" fontWeight={"bold"}>
                        دسته‌بندی
                    </Typography>
                    <Typography variant="subtitle1" className="text-center" fontWeight={"bold"}>
                        فروش ها
                    </Typography>
                    <Typography variant="subtitle1" className="text-center" fontWeight={"bold"}>
                        قیمت
                    </Typography>
                    <Typography variant="subtitle1" className="text-center" fontWeight={"bold"}>
                        اقدامات
                    </Typography>
                </Card>
                <Box className=" w-200 lg:w-full flex flex-col gap-2 mt-2">
                    <Suspense fallback={<ProductsSkeleton />}>
                        <ProductsClient
                            searchParams={{ branch, type, search }}
                        />
                    </Suspense>
                </Box>
            </Box>
        </PageLayout>
    );
};

export default Products;
