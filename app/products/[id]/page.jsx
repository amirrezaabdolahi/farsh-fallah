import BackWhereCome from '@/components/BackWhereCome'
import PageLayout from '@/components/PageLayout'
import { productsData } from '@/utils/mokaProducts'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditForm from './EditForm'

const ProductDetailsPage = ({ params }) => {

    const { id } = params
    const product = productsData.find(p => p.id === Number(id))


    return (
        <PageLayout>
            <BackWhereCome />
            <EditForm product={product} />
        </PageLayout>
    )
}


export default ProductDetailsPage