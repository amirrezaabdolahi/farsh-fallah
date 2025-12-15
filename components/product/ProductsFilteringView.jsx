"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import {
    Box,
    Breadcrumbs,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material"

import {
    boardCategories,
    carpetCategories,
} from "@/utils/productDetail"

const ProductsFilteringView = ({ category }) => {
    // single source of truth
    const [alignment, setAlignment] = useState("all")

    // derived data (no extra state)
    const categoryByType = useMemo(() => {
        if (alignment === "rugs") return carpetCategories
        if (alignment === "boards") return boardCategories
        return [...carpetCategories, ...boardCategories]
    }, [alignment])

    return (
        <Box className="w-full">
            {/* ---------- CATEGORIES ---------- */}
            <Box className="items-center my-2 w-full grid grid-cols-1 lg:grid-cols-2">
                <Box className="w-full">
                    <Breadcrumbs aria-label="breadcrumb">
                        {categoryByType.map((item) => (
                            <Link
                                key={item.id}
                                href={{
                                    pathname: "/products",
                                    query: {
                                        category: item.id,
                                        type: alignment !== "all" ? alignment : undefined,
                                    },
                                }}
                                className={
                                    item.id === category
                                        ? "border-b border-blue-500 text-blue-500"
                                        : ""
                                }
                            >
                                {item.label}
                            </Link>
                        ))}
                    </Breadcrumbs>
                </Box>
            </Box>

            {/* ---------- TYPE FILTER ---------- */}
            <ToggleButtonGroup
                className="flex items-center justify-start lg:justify-end gap-2 my-2"
                color="primary"
                value={alignment}
                exclusive
                onChange={(_, value) => value && setAlignment(value)}
            >
                <ToggleButton value="all">همه</ToggleButton>
                <ToggleButton value="rugs" color="success">
                    فرش
                </ToggleButton>
                <ToggleButton value="boards" color="warning">
                    تابلو فرش
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}

export default ProductsFilteringView
