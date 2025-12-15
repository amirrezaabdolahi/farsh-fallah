import BackWhereCome from '@/components/BackWhereCome'
import PageLayout from '@/components/PageLayout'
import { productsData } from '@/utils/mokaProducts'
import ProductForm from '@/app/products/[id]/UpdateForm'
import { productTypes, carpetCategories, materials } from '@/utils/productDetail'

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params

    const rawProduct = productsData.find(
        (p) => p.id === Number(id)
    )

    return (
        <PageLayout>
            <BackWhereCome />
            <ProductForm
                product={rawProduct}
            />
        </PageLayout>
    )
}

export default ProductDetailsPage
