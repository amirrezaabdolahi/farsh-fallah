import { NextResponse } from "next/server";

export async function GET(params) {}

export async function POST(request) {
    try {
        const data = await request.json();

        if (
            !data.customer_name ||
            !data.customer_phone ||
            !data.items?.length
        ) {
            return NextResponse.json(
                { success: false, message: "اطلاعات ناقص است" },
                { status: 400 }
            );
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}api/orders/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${process.env.BACKEND_API_TOKEN}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: "خطا در ارتباط با API" },
                { status: res.status }
            );
        }

        const result = await res.json();

        console.log("data has posted successfully:", result);

        return NextResponse.json(
            { success: true, data: result },
            { status: 201 }
        );
    } catch (error) {
        console.error("Order API error:", error);
        return NextResponse.json(
            { success: false, message: "خطای سرور رخ داد" },
            { status: 500 }
        );
    }
}
