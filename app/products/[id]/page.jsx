import BackWhereCome from "@/components/BackWhereCome";
import PageLayout from "@/components/PageLayout";
import ProductForm from "@/app/products/[id]/UpdateForm";
import { Box, Typography } from "@mui/material";

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.BACKEND_API_URL}api/products/${id}`);
    const rawProduct = await res.json();

    console.log(rawProduct)

    return (
        <PageLayout>
            <BackWhereCome />
            {rawProduct.id ? (
                <ProductForm product={rawProduct} />
            ) : (
                <Box>
                    <Typography variant="h6">محصول یافت نشد!!!</Typography>
                </Box>
            )}
        </PageLayout>
    );
};

export default ProductDetailsPage;
