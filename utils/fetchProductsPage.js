const fetchProductsPage = async (pageNumber = 1) => {
    if (loadingProducts || !hasMore) return;

    setLoadingProducts(true);

    try {
        const res = await fetch(`/api/products?page=${pageNumber}`);
        if (!res.ok) throw new Error("fetch failed");

        const data = await res.json();

        setProducts((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.next));
        setPage(pageNumber);
    } catch (e) {
        console.error(e);
    } finally {
        setLoadingProducts(false);
    }
};
