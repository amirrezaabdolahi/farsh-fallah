import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const branch = searchParams.get("branch");
    const type = searchParams.get("type");
    const page = searchParams.get("page")

    const params = new URLSearchParams();



    if (branch && branch !== "all") {
        params.append("branch", branch);
    }

    if (type) {
        params.append("type", type);
    }

    params.append("page" , page)

    console.log("params is : ",params.toString())

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
