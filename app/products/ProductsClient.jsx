"use client";

import { useEffect, useState } from "react";
import Product from "@/components/product/Product";
import { Card, Typography, Button } from "@mui/material";
import ProductsSkeleton from "./ProductsSkeleton";
import { fetchProducts } from "@/utils/fetchProducts";

const ProductsClient = ({ searchParams }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isMore, setIsMore] = useState(false);
    const [loading, setLoading] = useState(true);

    const { branch, type } = searchParams;

    const loadProducts = async (newPage = 1) => {
        setLoading(true);
        const data = await fetchProducts({ branch, type, page: newPage });

        setProducts((prev) =>
            newPage === 1 ? data.results : [...prev, ...data.results]
        );
        setPage(newPage);
        setIsMore(data?.next ? true : false);
        // setTotalPages(Math.ceil((data.results?.length || 0) / (data.results?.length || 30)));
        setLoading(false);
    };

    useEffect(() => {
        loadProducts(1); // هر بار branch یا type تغییر کرد page 1 fetch می‌کنیم
    }, [branch, type]);

    if (loading || products.length === 0) return <ProductsSkeleton />;


    return (
        <>
            {products.map((p) => (
                <Product key={p.id} product={p} />
            ))}
            {isMore && (
                <Button
                    onClick={() => loadProducts(page + 1)}
                    disabled={loading}
                    variant="contained"
                    className="my-4"
                >
                    {loading ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
                </Button>
            )}
        </>
    );
};

export default ProductsClient;
