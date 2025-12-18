import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;

    try {
        const formData = await request.formData();

        console.log(formData);

        const res = await fetch(
            `${process.env.BACKEND_API_URL}api/products/${id}/`,
            {
                method: "PUT",
                body: formData,
            }
        );

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            return NextResponse.json(
                {
                    message:
                        error?.detail ||
                        error?.message ||
                        "خطا در بروزرسانی محصول",
                },
                { status: res.status }
            );
        }

        const data = await res.json();

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("UPDATE PRODUCT ERROR:", err);

        return NextResponse.json(
            { message: "خطای داخلی سرور" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

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
