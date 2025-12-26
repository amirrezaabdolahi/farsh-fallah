"use client";

import * as React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, Alert } from "@mui/material";
import dayjs from "@/utils/dayjs";


export default function PersianDateRangePicker() {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const isInvalidRange =
        startDate && endDate && endDate.isBefore(startDate, "day");

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} direction="row">
                <DatePicker
                    label="از تاریخ"
                    value={startDate}
                    onChange={setStartDate}
                    views={["year", "month", "day"]}
                    format="YYYY/MM/DD"
                />

                <DatePicker
                    label="تا تاریخ"
                    value={endDate}
                    minDate={startDate}
                    onChange={setEndDate}
                    views={["year", "month", "day"]}
                    format="YYYY/MM/DD"
                />
            </Stack>

            {isInvalidRange && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد
                </Alert>
            )}
        </LocalizationProvider>
    );
}
