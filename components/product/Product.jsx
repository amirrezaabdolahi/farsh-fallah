"use client";

import {
    DeleteRounded,
    EditRounded,
    ReportProblemRounded,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

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

const Product = ({ product, onDelete }) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (id) => {
        if (!id || loading) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json().catch(() => null);
                toast.error(error?.message || "حذف محصول ناموفق بود");
                return;
            }

            toast.success("محصول با موفقیت حذف شد");

            // Remove product from UI immediately
            onDelete?.(id);
        } catch (error) {
            toast.error(error.message || "حذف محصول ناموفق بود");
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <>
            <Card
                elevation={3}
                key={product.id}
                className="w-full rounded-xl!  border-none! py-4 px-6 grid grid-cols-6 items-center justify-between"
            >
                <Box className="flex items-center gap-2 grid-cols-1">
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
                            {product.serial_number
                                ? product.serial_number
                                : product.id}
                        </Typography>
                    </span>
                </Box>

                <Typography variant="subtitle1 text-center grid-cols-1">
                    {product.created_at.split(" - ")[0]}
                </Typography>
                <Typography variant="subtitle1 text-center grid-cols-1">
                    {product.branch_display}
                </Typography>
                <Typography
                    variant="subtitle1 text-center grid-cols-1"
                    dir="ltr"
                >
                    {product.size}
                </Typography>
                <Typography variant="subtitle1 text-center grid-cols-1">
                    {Number(product.sale_price).toLocaleString("fa-IR")} تومان
                </Typography>

                <Box className="flex items-center justify-center grid-cols-1">
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
                    <Box className="text-start flex gap-2 justify-center">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(product.id)}
                            disabled={loading}
                        >
                            {loading ? "در حال حذف..." : "حذف"}
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
