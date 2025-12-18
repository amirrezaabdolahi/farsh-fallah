"use client";

import { useEffect, useRef, useState } from "react";
import Product from "@/components/product/Product";
import ProductsSkeleton from "./ProductsSkeleton";
import { fetchProducts } from "@/utils/fetchProducts";

const ProductsClient = ({ searchParams }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isMore, setIsMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef(null);

    const { branch, type } = searchParams;

    const fetchPage = async (pageNumber) => {
        if (loading) return;

        setLoading(true);
        const data = await fetchProducts({ branch, type, page: pageNumber });

        setProducts((prev) =>
            pageNumber === 1 ? data.results : [...prev, ...data.results]
        );

        setIsMore(!!data.next);
        setPage(pageNumber);
        setLoading(false);
    };

    useEffect(() => {
        fetchPage(1);
    }, [branch, type]);

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

    return (
        <>
            {products.map((p) => (
                <Product key={p.id} product={p} />
            ))}

            {loading && <ProductsSkeleton />}

            {isMore && <div ref={loaderRef} style={{ height: 1 }} />}
        </>
    );
};

export default ProductsClient;
