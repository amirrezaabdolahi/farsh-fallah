"use client"
import { ArrowBackRounded } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackWhereCome = () => {

    const router = useRouter()

    const handleBackNavigate = () => {

        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }

    }

    return (
        <Box sx={{ width: '100%', textAlign: 'end' }} >
            <Tooltip title='بازگشت' >
                <IconButton color="primary"
                    onClick={handleBackNavigate}>
                    <ArrowBackRounded fontSize='large' />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default BackWhereCome