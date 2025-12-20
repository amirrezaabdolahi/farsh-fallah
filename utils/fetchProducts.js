export const fetchProducts = async ({ branch, type, search, page = 1 }) => {
    try {
        const params = new URLSearchParams();

        if (branch && branch !== "all") params.append("branch", branch);
        if (type && type !== "all") params.append("type", type);
        if (typeof search === "string" && search.trim())
            params.append("search", search.trim());

        params.append("page", page);

        const res = await fetch(`/api/products/?${params.toString()}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            // Return error info instead of throwing
            return {
                results: [],
                count: 0,
                next: null,
                previous: null,
                error:
                    errorData?.message || `HTTP error! status: ${res.status}`,
            };
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return {
            results: [],
            count: 0,
            next: null,
            previous: null,
            error:
                error.message || "Something went wrong while fetching products",
        };
    }
};
