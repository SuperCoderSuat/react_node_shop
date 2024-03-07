import './Product.scss'
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/product_display/ProductDisplay';
import DescribtionBox from '../../components/description_box/DescribtionBox';
import RelatedProducts from '../../components/related_products/RelatedProducts';

const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            <Breadcrumb product={product} />
            <ProductDisplay product={product} />
            <DescribtionBox />
            <RelatedProducts />
        </div>
    );
}
 
export default Product;