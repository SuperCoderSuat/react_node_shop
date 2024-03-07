import './Breadcrumb.scss'
import arrow_icon from '../../assets/images/breadcrum_arrow.png'

const Breadcrumb = ( probs ) => {
    const {product} = probs;

    return (
        <div className='breadcrumb'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
        </div>
    );
}
 
export default Breadcrumb;