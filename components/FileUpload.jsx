"use client"
import { Button } from '@mui/material'
import React, { useRef } from 'react'

const FileUpload = () => {

    const fileuploadinput = useRef(null)

    return (
        <>
            <div className="w-full h-100 shadow-2xl border border-gray-200">

            </div>

            <input type="file" name="image" id="image" className='hidden' ref={fileuploadinput} onChange={(e) => {
                const file = e.target.files?.[0]
                console.log(file)
            }} />
            <Button variant='contained' onClick={() => {
                fileuploadinput.current?.click()
            }} >upload file</Button>

        </>

    )
}

export default FileUpload