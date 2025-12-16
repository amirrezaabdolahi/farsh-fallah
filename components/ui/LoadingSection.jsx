import { CachedRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

const spinStyle = {
    animation: "spin 1s linear infinite",
};

const LoadingSection = () => {
    return (
        <Box className="w-full h-full flex items-center justify-center">
            <CachedRounded color="primary" sx={spinStyle} />
        </Box>
    );
};

export default LoadingSection;
