"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";

export default function NotFound() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <ErrorOutlineIcon
                    sx={{
                        fontSize: 100,
                        color: "error.main",
                        mb: 2,
                    }}
                />

                <Typography variant="h1" fontWeight={700}>
                    ۴۰۴
                </Typography>

                <Typography variant="h5" color="text.secondary" mb={3}>
                    صفحه‌ای که دنبال آن هستید پیدا نشد!
                </Typography>

                <Button
                    component={Link}
                    href="/"
                    variant="contained"
                    size="large"
                >
                    بازگشت به صفحه اصلی
                </Button>
            </Box>
        </Container>
    );
}
