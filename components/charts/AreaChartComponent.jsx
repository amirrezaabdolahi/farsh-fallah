"use client";

import React, { useState } from 'react';
import AreaChartView from './AreaChart';
import { Box, Card, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';

const options = [
    { value: "today", label: "امروز" },
    { value: "week", label: "هفته" },
    { value: "month", label: "ماه" },
    { value: "year", label: "سال" }
];

const AreaChartComponent = ({data}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // default → week
    const [period, setPeriod] = useState("week");

    const periods = {
        today: data.today,
        week: data.week,
        month: data.month,
        year: data.year
    };

    const ITEM_HEIGHT = 48;

    return (
        <Card className="w-full h-full p-4 pl-0 select-none!" dir="ltr">
            <Box className="text-end">
                <IconButton
                    aria-label="more"
                    id="long-button"
                    className='border! rounded-lg! mb-2!'
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertRounded />
                </IconButton>

                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            direction: "rtl",
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={period === option.value}
                            onClick={() => {
                                setPeriod(option.value);
                                handleClose();
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            <AreaChartView
                data={periods[period].data}
                xKey="label"
                yKey="sales"
            />
        </Card>
    );
};

export default AreaChartComponent;
