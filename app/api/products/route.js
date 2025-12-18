import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const branch = searchParams.get("branch");
    const type = searchParams.get("type");
    const page = searchParams.get("page");
    const search = searchParams.get("search")

    const params = new URLSearchParams();

    if (branch && branch !== "all") {
        params.append("branch", branch);
    }

    if (type && type !== 'all') {
        params.append("type", type);
    }

    if (search) {
        params.append("search" , search)
    }

    params.append("page", page);

    console.log("params is : ", params.toString());

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}api/products/?${params.toString()}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { message: "Backend error" },
                { status: 500 }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const res = await fetch(`${process.env.BACKEND_API_URL}api/products/`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            return NextResponse.json(
                {
                    message:
                        error?.detail || error?.message || "خطا در ساخت محصول",
                },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("POST PRODUCT ERROR:", error);
        return NextResponse.json(
            { message: "خطای داخلی سرور" },
            { status: 500 }
        );
    }
}
