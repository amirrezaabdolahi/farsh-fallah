"use client";
import { Autocomplete, TextField } from '@mui/material';
import React from 'react'

const ChartFiterComponent = () => {



    return (
        <Autocomplete
            disablePortal
            options={[
                { label: 'هفته', id: 1 },
                { label: 'ماه', id: 2 },
                { label: 'سال', id: 3 },
                { label: 'همه', id: 4 },
                { label: 'انتخاب زمان', id: 5 },
                { label: 'امروز', id: 6 },
            ]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="فیلتر" />}
        />
    )
}

export default ChartFiterComponent