// utils/fetchProducts.js
export const fetchProducts = async ({ branch, type, search, page = 1 }) => {
    try {
        const params = new URLSearchParams();

        if (branch && branch !== "all") params.append("branch", branch);
        if (type && type !== "all") params.append("type", type);
        if (search?.trim()) params.append("search", search.trim());

        params.append("page", page);

        const res = await fetch(`/api/products/?${params.toString()}`, {
            cache: "no-store",
        });

        console.log("this is res in fetch : ", res);

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { results: [], count: 0, next: null, previous: null };
    }
};
