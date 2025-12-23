"use client";
import SaleForm from "@/components/fomrs/SaleForm";
import { AddRounded } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchProducts from "./SearchProducts";

const SaleContent = () => {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    return (
        <>
            <Card className="p-4 rounded-lg! h-max">
                <Box className="w-full justify-start flex gap-2">
                    <AddRounded
                        className="rounded-full"
                        sx={{
                            bgcolor: "primary.main",
                            width: 50,
                            height: 50,
                            padding: 1,
                            color: "white",
                        }}
                    />
                    <Box className="flex-col flex items-start gap-0">
                        <Typography variant="body1">
                            اضافه کردن فروش جدید
                        </Typography>
                        <Typography variant="body2">
                            تمام فیلد های زیر رو برای ایجاد یک فروش پر کنید
                        </Typography>
                    </Box>
                </Box>

                <SaleForm items={items} setItems={setItems} />
            </Card>

            <SearchProducts setItems={setItems} items={items} />
        </>
    );
};

export default SaleContent;
