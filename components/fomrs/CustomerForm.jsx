"use client"


import { areas, locations } from '@/utils/locations'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'


// not using

const CustomerForm = () => {
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState(1)

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
        setCity(""); // ریست شهر وقتی استان عوض می‌شود
    };

    const selectedProvince = locations.find(p => p.province === province);

    return (
        <>
            <TextField placeholder='091256789' label="شماره تلفن" />
            <TextField placeholder='امیررضا عبدالهی' label="نام" />
            <Box className="flex gap-2">
                <FormControl fullWidth>
                    <InputLabel>استان</InputLabel>
                    <Select value={province} label="استان" onChange={handleProvinceChange}>
                        {locations.map((item) => (
                            <MenuItem key={item.province} value={item.province}>
                                {item.province}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* شهر */}
                <FormControl fullWidth disabled={!province}>
                    <InputLabel>شهر</InputLabel>
                    <Select value={city} label="شهر" onChange={(e) => setCity(e.target.value)}>
                        {selectedProvince?.cities.map((city) => (
                            <MenuItem key={`${selectedProvince.province}-${city}`} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* منطقه اگه شهر تهران بود*/}

                {city === 'تهران' && (
                    <FormControl fullWidth disabled={!province}>
                        <InputLabel>منطقه</InputLabel>
                        <Select value={area} label="منطقه" onChange={(e) => setArea(e.target.value)}>
                            {areas.map((area) => (
                                <MenuItem key={area} value={area}>
                                    {area}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

            </Box>
        </>
    )
}

export default CustomerForm