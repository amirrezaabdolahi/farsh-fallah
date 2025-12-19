export const fetchOrders = async ({ id}) => {
    try {
        const params = new URLSearchParams();

        const res = await fetch(`/api/products/${id ? id : ''}`, {
            cache: "no-store",
        });

        console.log("this is res in fetch : ", res);

        if (!res.ok) {
            console.log("api post falid")
        };

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { results: [], count: 0, next: null, previous: null };
    }
};
