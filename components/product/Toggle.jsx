"use client"
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'

const Toggle = ({category}) => {
    const [alignment, setAlignment] = useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <ToggleButtonGroup
            className="flex items-center justify-start lg:justify-end gap-2 my-2"
            color='primary'
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton variant='contained' color='primary' value={'all'} >
                <Link href={"products"}>همه</Link>
            </ToggleButton>
            <ToggleButton variant='contained' color='success' value={'rugs'} >
                <Link href={"?type=rugs"}>
                    فرش
                </Link>
            </ToggleButton>
            <ToggleButton variant='contained' color='warning' value={'boards'} >
                <Link href={"?type=boards"}>
                    تابلو فرش
                </Link>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Toggle