"use client";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "@/components/ThemeContext";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastContainer";

const Vazirmatn_Sans = Vazirmatn({
    subsets: ["arabic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-vazirmatn",
});
import { Button } from "@mui/material";

export default function GlobalError({ error, reset }) {
    return (
        <html lang="fa" dir="rtl">
            <body
                className={`${Vazirmatn_Sans.variable} antialiased flex items-center justify-center w-full h-screen flex-col`}
            >
                <ThemeContextProvider>
                    <h2 className="text-xl font-bold">
                        مشکلی در لود سایت به وجو آمده.
                    </h2>
                    <p>
                        اگر بعد از ریست سایت باز این صفحه آمده با پشتیبان تماس
                        بگیرید.
                    </p>
                    <Button
                        onClick={() => {
                            if (typeof reset === "function") {
                                reset();
                            } else {
                                window.location.reload();
                            }
                        }}
                        className=""
                    >
                        بارگذاری دوباره
                    </Button>
                </ThemeContextProvider>
            </body>
        </html>
    );
}
