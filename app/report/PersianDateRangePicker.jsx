"use client";

import * as React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, Alert, Button, Box } from "@mui/material";
import dayjs from "@/utils/dayjs";
import Link from "next/link";

export default function PersianDateRangePicker({ start, end }) {
    const parsedStart = start ? dayjs(start) : null;
    const parsedEnd = end ? dayjs(end) : null;
    const [startDate, setStartDate] = React.useState(parsedStart);
    const [endDate, setEndDate] = React.useState(parsedEnd);

    const isInvalidRange =
        startDate && endDate && endDate.isBefore(startDate, "day");

    const startISO = startDate
        ?.calendar("gregory")
        .hour(12)
        .format("YYYY-MM-DD");

    const endISO = endDate?.calendar("gregory").hour(12).format("YYYY-MM-DD");

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} direction="row" className="items-center">
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
                {startISO && endISO && (
                    <Box className="flex items-center gap-2">
                        <Link
                            href={`/report/?start_date=${startISO}&end_date=${endISO}`}
                        >
                            <Button variant="contained">اعمال</Button>
                        </Link>
                        <Link href={`/report`}>
                            <Button variant="contained" color="error">
                                حذف
                            </Button>
                        </Link>
                    </Box>
                )}
            </Stack>

            {isInvalidRange && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد
                </Alert>
            )}
        </LocalizationProvider>
    );
}
