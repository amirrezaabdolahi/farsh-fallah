"use client";

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Stack,
    Button,
    IconButton,
    Typography,
    Avatar,
    CircularProgress,
    Paper,
    Tooltip,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PageLayout from "@/components/PageLayout";

export default function ImageUpload({
    value,
    onChange,
    maxSizeMB = 5,
    accept = "image/*",
    aspect = 1,
    placeholder = "Upload image",
    helperText = "",
    sx = {},
}) {
    const [file, setFile] = useState(value ?? null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        // external value sync
        setFile(value ?? null);
    }, [value]);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        if (typeof file === "string") {
            // already a URL
            setPreview(file);
            return;
        }

        // file is a File object
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    function validateFile(f) {
        setError("");
        if (!f) return false;
        const sizeMB = f.size / 1024 / 1024;
        if (sizeMB > maxSizeMB) {
            setError(`File is too large. Max ${maxSizeMB} MB.`);
            return false;
        }
        if (!f.type.startsWith("image/")) {
            setError("Invalid file type. Please select an image.");
            return false;
        }
        return true;
    }

    const handleFiles = (files) => {
        const first = files?.[0];
        if (!first) return;
        if (!validateFile(first)) return;
        setLoading(true);
        // simulate any preprocessing / upload: keep quick and sync
        setTimeout(() => {
            setFile(first);
            setLoading(false);
            if (typeof onChange === "function") onChange(first);
        }, 200); // tiny delay to show loading affordance
    };

    const handleInputChange = (e) => {
        handleFiles(e.target.files);
        // reset input so selecting same file again triggers change
        e.target.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const dt = e.dataTransfer;
        if (dt?.files?.length) handleFiles(dt.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        setError("");
        if (typeof onChange === "function") onChange(null);
    };

    return (
        <PageLayout>
            <Box sx={{ width: "100%", ...sx }}>
                <Paper
                    elevation={dragActive ? 8 : 2}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "box-shadow 200ms, border-color 200ms",
                        border: (theme) =>
                            dragActive ? `2px dashed ${theme.palette.primary.main}` : "2px dashed transparent",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                    aria-label="Image upload dropzone"
                >
                    {/* Thumbnail / preview */}
                    <Box
                        sx={{
                            flex: "0 0 auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: 64, sm: 96, md: 128 },
                            height: { xs: 64, sm: 96, md: 128 },
                            borderRadius: 2,
                            overflow: "hidden",
                            backgroundColor: "grey.100",
                        }}
                    >
                        {loading ? (
                            <CircularProgress />
                        ) : preview ? (
                            <Avatar
                                src={preview}
                                alt="preview"
                                variant="rounded"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    aspectRatio: `${aspect} / 1`,
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 1,
                                    px: 1,
                                }}
                            >
                                <PhotoCamera fontSize="large" />
                                <Typography variant="caption" align="center">
                                    {placeholder}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Controls */}
                    <Stack
                        spacing={1}
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            alignItems: "flex-start",
                            width: { xs: "60%", sm: "60%", md: "auto" },
                        }}
                    >
                        <Typography variant="subtitle1" noWrap>
                            {helperText || "Select an image or drag it here"}
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <input
                                ref={inputRef}
                                type="file"
                                accept={accept}
                                onChange={handleInputChange}
                                style={{ display: "none" }}
                                aria-hidden="true"
                                id="mui-image-upload-input"
                            />

                            <label htmlFor="mui-image-upload-input" style={{ display: "inline-block" }}>
                                <Button
                                    onClick={() => inputRef.current?.click()}
                                    startIcon={<UploadIcon />}
                                    variant="contained"
                                    component="span"
                                    size="medium"
                                >
                                    Choose
                                </Button>
                            </label>

                            <Button
                                onClick={() => inputRef.current?.click()}
                                variant="outlined"
                                startIcon={<UploadIcon />}
                                sx={{ display: { xs: "none", sm: "inline-flex" } }}
                            >
                                Replace
                            </Button>

                            {preview && (
                                <Tooltip title="Remove">
                                    <IconButton aria-label="remove-image" onClick={handleRemove}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>

                        {error && (
                            <Typography variant="caption" color="error">
                                {error}
                            </Typography>
                        )}

                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            Max size: {maxSizeMB} MB &middot; Accepts: {accept}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </PageLayout>
    );
}

ImageUpload.propTypes = {
    value: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]),
    onChange: PropTypes.func,
    maxSizeMB: PropTypes.number,
    accept: PropTypes.string,
    aspect: PropTypes.number,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    sx: PropTypes.object,
};
