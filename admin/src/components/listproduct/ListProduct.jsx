import { useState } from 'react';
import './ListProduct.scss'
import { useEffect } from 'react';
import cross_icon from '../../assets/images/cross_icon.png'

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch("http://localhost:3000/allproducts")
        .then((res) => res.json())
        .then((data) => setAllProducts(data));
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:3000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
        await fetchInfo();
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Titel</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts.map((product, index) => {
                    return <>
                    <div className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => {removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                    <hr />
                    </>
                })}
            </div>
        </div>
    );
}
 
export default ListProduct;