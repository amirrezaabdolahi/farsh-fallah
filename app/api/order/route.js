import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page");
        const search = searchParams.get("search");

        const params = new URLSearchParams();

        if (page && Number(page) > 1) {
            params.append("page", page);
        }
        if (search?.trim()) {
            params.append("search", search);
        }

        const query = params.toString();
        const url = `${process.env.BACKEND_API_URL}api/orders/${
            query ? `?${query}` : ""
        }`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${process.env.BACKEND_API_TOKEN}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: "خطا در ارتباط با API بک‌اند" },
                { status: res.status }
            );
        }

        const data = await res.json();

        // ⬅️ contract ثابت با frontend
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Orders API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "خطای داخلی سرور",
            },
            { status: 500 }
        );
    }
}

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
