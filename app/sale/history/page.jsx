import PageLayout from '@/components/PageLayout'
import { saleHistory } from '@/utils/mokaSaleHistory'
import { AccessTimeRounded, AttachMoneyRounded, CalendarMonthRounded } from '@mui/icons-material'
import { Box, Card, Typography } from '@mui/material'
import React from 'react'

const HistoryPage = () => {
    return (
        <PageLayout>
            <Box className="w-full items-center">
                <Typography variant='h5'>تاریخچه</Typography>
            </Box>

            <Box className="grid grid-cols-5 gap-4">
                {saleHistory.map(history => (
                    <Card elevation={2} key={history.id} className='p-2 rounded-lg! flex flex-col gap-2'>
                        <Typography variant='body1' fontWeight={'bold'}>
                            {history.product}
                        </Typography>
                        <Box className="w-full items-center flex gap-2">
                            <Typography variant='body2'>
                                <AccessTimeRounded color='primary' />
                                {history.hour}
                            </Typography>
                            <Typography variant='body2'>
                                <AttachMoneyRounded color='success' />
                                {history.price.toLocaleString()}
                            </Typography>
                        </Box>
                        <Typography variant='body2'>
                            <CalendarMonthRounded color='warning' />
                            {history.date}
                        </Typography>
                        <Typography variant='body1'>
                            تعداد :
                            {history.amount}
                        </Typography>
                        <Box className="w-full items-center flex gap-2">
                            <Typography variant='body1' fontWeight={'bold'}>{history.customerName}</Typography>
                            <Typography variant='body1' fontWeight={'bold'}>{history.customerPhone}</Typography>
                        </Box>
                    </Card>
                ))}
            </Box>

        </PageLayout>
    )
}

export default HistoryPage