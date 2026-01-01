"use client";

import { useEffect, useRef, useState } from "react";
import Product from "@/components/product/Product";
import ProductsSkeleton from "./ProductsSkeleton";
import { fetchProducts } from "@/utils/fetchProducts";
import { Card, Typography } from "@mui/material";
import { toast } from "react-toastify";

const ProductsClient = ({ searchParams }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isMore, setIsMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef(null);

    const { branch, type, search } = searchParams;

    const fetchPage = async (pageNumber) => {
        if (loading) return;

        setLoading(true);
        const data = await fetchProducts({
            branch,
            type,
            search,
            page: pageNumber,
        });

        if (data.error) {
            toast.error("خطا در بارگذاری محصولات");
        }

        setProducts((prev) =>
            pageNumber === 1 ? data.results : [...prev, ...data.results]
        );

        setIsMore(!!data.next);
        setPage(pageNumber);
        setLoading(false);
    };

    useEffect(() => {
        fetchPage(1);
    }, [branch, type, search]);

    useEffect(() => {
        if (!loaderRef.current || !isMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    fetchPage(page + 1);
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0,
            }
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [page, isMore, loading]);

    const isInitialLoading = loading && products.length === 0;

    if (isInitialLoading) return <ProductsSkeleton />;

    const handleDelete = (deletedId) => {
        c
    };

    return (
        <>
            {products.length === 0 && (
                <Card>
                    <Typography variant="body1" className="text-center py-3">
                        محصولی یافت نشد
                    </Typography>
                </Card>
            )}
            {products.map((p) => (
                <Product key={p.id} product={p} onDelete={handleDelete} />
            ))}

            {loading && <ProductsSkeleton />}

            {isMore && <div ref={loaderRef} style={{ height: 1 }} />}
        </>
    );
};

export default ProductsClient;
