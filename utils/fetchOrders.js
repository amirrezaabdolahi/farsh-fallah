export const fetchOrders = async ({ page = 1 , search } = {}) => {
    try {
        const params = new URLSearchParams();

        if (page > 1) {
            params.append("page", page);
        }
        if (search?.trim()) {
            params.append("search" , search)
        }

        const query = params.toString();
        const url = `/api/order${query ? `?${query}` : ""}`;

        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch orders");
        }

        return await res.json(); // { results, count, next, previous }
    } catch (error) {
        console.error("Error fetching orders:", error);

        return {
            results: [],
            count: 0,
            next: null,
            previous: null,
        };
    }
};

export const fetchOrderDetail = async (id) => {
    try {
        const res = await fetch(`/api/order/${id}/`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch order detail");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching order detail:", error);
        return null;
    }
};
