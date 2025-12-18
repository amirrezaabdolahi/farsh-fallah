"use client";
import {
    DeleteRounded,
    EditRounded,
    RemoveRedEyeRounded,
    ReportProblemRounded,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

const Product = ({ product }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (id) => {
        if (!id) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json().catch(() => null);
                throw new Error(error?.message || "حذف محصول ناموفق بود");
            }

            // Optional: update state to remove the deleted product from the UI
            console.log("Product deleted successfully");
            // e.g., setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("DELETE ERROR:", error);
            alert(error.message); // or use a toast
        }
    };

    return (
        <>
            <Card
                elevation={3}
                key={product.id}
                className="w-full rounded-xl! border border-gray-200 py-4 px-6 flex items-center justify-between"
            >
                <Box className="flex items-center gap-2">
                    <Box
                        className="w-13 h-13 rounded-full overflow-hidden flex items-center justify-center"
                        bgcolor="lightgray"
                    >
                        {product?.image ? (
                            <Image
                                src={product.image}
                                alt={product?.name || "product image"}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                                quality={50}
                            />
                        ) : (
                            <Typography variant="body1" fontWeight="bold">
                                {product?.name?.[0]?.toUpperCase() || "?"}
                            </Typography>
                        )}
                    </Box>

                    <span>
                        <Typography variant="subtitle1">
                            {product.name}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontSize={12}
                            color="info"
                        >
                            {product.id}
                        </Typography>
                    </span>
                </Box>
                <Typography variant="subtitle1">
                    {product.created_at.split(" - ")[0]}
                </Typography>
                <Typography variant="subtitle1">
                    {product.branch_display}
                </Typography>
                <Typography variant="subtitle1" dir="ltr">
                    {product.size}
                </Typography>
                <Typography variant="subtitle1">
                    {Number(product.sale_price).toLocaleString("fa-IR")} تومان
                </Typography>
                <Box className="flex items-center">
                    <Link href={`products/${product.id}`} className="p-0 m-0">
                        <IconButton color="primary">
                            <EditRounded />
                        </IconButton>
                    </Link>
                    <IconButton color="error" onClick={handleOpen}>
                        <DeleteRounded />
                    </IconButton>
                </Box>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style} className="rounded-xl!">
                    <ReportProblemRounded
                        color="warning"
                        sx={{ fontSize: 60 }}
                    />
                    <Typography variant="body1" className="my-5!">
                        آیا مطمعنی از حذف کردن محصول؟
                    </Typography>
                    <Box className="text-start flex gap-2">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={(e) => handleDelete(product.id)}
                        >
                            حذف
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            انصراف
                        </Button>
                    </Box>
                </Card>
            </Modal>
        </>
    );
};

export default Product;
