"use client";

import PageLayout from "@/components/PageLayout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        if (!username || !password) {
            toast.error("نام کاربری و رمز عبور را تکمیل کنید");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}api/auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "خطایی رخ داده");
                return;
            }

            router.replace("/");
            router.refresh();
        } catch (error) {
            toast.error("خطا در ارتباط با سرور");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <Box className="w-full h-screen flex items-center justify-center ">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center gap-2 shadow p-4 rounded-lg"
                >
                    <Typography>ورود</Typography>
                    <TextField
                        name="username"
                        size="small"
                        label="نام کاربری"
                    />
                    <TextField name="password" size="small" label="رمز ورود" />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="small"
                        disabled={loading}
                    >
                        {loading ? "در حال ورود..." : "ورود"}
                    </Button>
                </form>
            </Box>
        </PageLayout>
    );
};

export default Login;
