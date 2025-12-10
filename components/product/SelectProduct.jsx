"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar, Typography } from '@mui/material';
import { CachedRounded } from '@mui/icons-material';

export default function ProductSelect({ options }) {
    const [selected, setSelected] = React.useState("");

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="product-select-label">محصول</InputLabel>
            <Select
                labelId="product-select-label"
                id="product-select"
                value={selected}
                label="محصول"
                onChange={handleChange}
            >
                {options && options.length > 0 ? (
                    options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                    src={option.avatar}
                                    alt={option.name || "unknown"}
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Typography variant="body2">
                                    {option.name || "بدون نام"}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem value="">
                        <CachedRounded className="animate-spin" />
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
