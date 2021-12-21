import React, { useState, useEffect } from 'react';
import { getProduct } from '../functions/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/cards/SingleProduct';
const Product = () => {
    const { slug } = useParams();
    console.log(slug);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        loadProduct()

    }, [slug])

    const loadProduct = () => {
        getProduct(slug)
            .then(res => {
                setProduct(res.data);
                console.log(res.data);

            })
            .catch((err) => console.log(err));
    }
    return (
        <div>
            <div className='container fluid'>
                <div className='row pt-4' >
                    <SingleProduct product={product} />
                </div>
                <div className="row p-4">
                    <h4 className='col text-center py-3 mt-3 mb-3 bg-light'>Related Products</h4>
                </div>
            </div>


        </div>
    );
};

export default Product;