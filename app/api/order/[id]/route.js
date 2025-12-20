import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json(
            { success: false, message: "Order ID is required" },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}api/orders/${Number(id)}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Token ${process.env.BACKEND_API_TOKEN}`,
                },
                cache: "no-store", // مهم برای دیتای داینامیک
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: "Order not found" },
                { status: res.status }
            );
        }

        const data = await res.json();

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error("Order detail API error:", error);

        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
