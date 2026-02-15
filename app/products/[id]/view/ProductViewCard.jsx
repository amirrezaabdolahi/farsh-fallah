"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Stack,
    Divider,
    Dialog,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { enTypeToFa } from "@/utils/enTofa";

const ProductViewCard = ({ product }) => {
    const [open, setOpen] = useState(false);
    const [showPrice, setShowPrice] = useState(false);

    const toggleShowPrice = () => {
        setShowPrice(!showPrice);
    };

    return (
        <>
            {/* کارت محصول */}
            <Card sx={{ maxWidth: 400, minWidth : 300, borderRadius: 3, boxShadow: 3 }}>
                {product.image && (
                    <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                        sx={{ objectFit: "cover", cursor: "pointer" }}
                        onClick={() => setOpen(true)}
                    />
                )}

                <CardContent className="flex flex-col gap-2">
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {product.name}
                    </Typography>

                    <Stack direction="row" spacing={1} mb={1}>
                        <Chip
                            label={product.branch_display}
                            color="primary"
                            size="small"
                        />
                        {product.type && (
                            <Chip
                                label={enTypeToFa(product.type)}
                                color="secondary"
                                size="small"
                            />
                        )}
                    </Stack>

                    <Typography variant="body2" color="text.secondary" mb={1}>
                        {product.description}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        className="cursor-pointer"
                        onClick={toggleShowPrice}
                    >
                        <Typography variant="body2" fontWeight="bold">
                            قیمت واحد:
                        </Typography>
                        <Typography variant="body2">
                            {showPrice ? product.unit_price : "*******"} تومان
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="bold">
                            قیمت فروش:
                        </Typography>
                        <Typography variant="body2">
                            {product.sale_price} تومان
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="bold">
                            سایز:
                        </Typography>
                        <Typography variant="body2">
                            {product.size || "-"}
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="bold">
                            شماره سریال:
                        </Typography>
                        <Typography variant="body2">
                            {product.serial_number}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

            {/* Dialog برای Full Screen */}
            <Dialog
                open={open}
                BackdropProps={{
                    sx: {
                        backgroundColor: "rgba(0,0,0,0.9)", 
                    },
                }}
                onClose={() => setOpen(false)}
                maxWidth="lg"
            >
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "black",
                    }}
                />
            </Dialog>
        </>
    );
};

export default ProductViewCard;
