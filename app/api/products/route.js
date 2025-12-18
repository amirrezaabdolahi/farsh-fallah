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

    if (type) {
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

        if (!res.results) {
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
        const formData = await req.formData(); // Next.js parses the incoming multipart

        // Forward it as multipart/form-data to the backend
        const res = await fetch(`${process.env.BACKEND_API_URL}api/products/`, {
            method: "POST",
            body: formData, // just send the FormData
            // do NOT set Content-Type; fetch sets it automatically
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

export async function DELETE(request, { params }) {
    const { id } = params; // the product ID to delete

    if (!id) {
        return NextResponse.json(
            { message: "Product ID is required" },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}api/products/${id}/`,
            {
                method: "DELETE",
            }
        );

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            return NextResponse.json(
                {
                    message:
                        error?.detail || error?.message || "خطا در حذف محصول",
                },
                { status: res.status }
            );
        }

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("DELETE PRODUCT ERROR:", err);
        return NextResponse.json(
            { message: "خطای داخلی سرور" },
            { status: 500 }
        );
    }
}
