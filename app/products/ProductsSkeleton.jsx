import { Card, Skeleton } from "@mui/material";
import { Box } from "@mui/system";

export default function ProductsSkeleton() {
    return (
        <Box className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-4">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={40} />
                </Card>
            ))}
        </Box>
    );
}
