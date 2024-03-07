import Hero from '../../components/hero/Hero';
import NewCollections from '../../components/new_collections/NewCollections';
import Newsletter from '../../components/newsletter/Newsletter';
import Offers from '../../components/offers/offers';
import Popular from '../../components/popular/Popular';
import './Shop.scss'

const Shop = () => {
    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
            <Newsletter />
        </div>
    );
}
 
export default Shop;