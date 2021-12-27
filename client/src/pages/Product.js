import React, { useState, useEffect } from 'react';
import { getProduct } from '../functions/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/cards/SingleProduct';
import { productStarRating } from '../functions/product';
import { useSelector } from 'react-redux';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Product = () => {
    const { slug } = useParams();
    console.log(slug);
    const [product, setProduct] = useState([]);
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);
    const { user } = useSelector((state) => ({ ...state }))


    useEffect(() => {
        loadProduct()

    }, [slug])

    useEffect(() => {

        if (product.ratings && user) {
            console.log("userid ", user)
            let existingRatingObject = product.ratings.find((r) => r.postedBy == user._id)
            console.log(existingRatingObject);
            (existingRatingObject && setStar(existingRatingObject.star));

        }
    })



    const loadProduct = () => {
        getProduct(slug)
            .then(res => {
                setProduct(res.data);
                getRelated(res.data._id)
                    .then(res => {
                        console.log("res", res);
                        setRelated(res.data)
                    })
                //   console.log(res.data);

            })
            .catch((err) => console.log(err));
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);

        productStarRating(newRating, name, user.token).then(() => console.log("added rating sucessfully"))
        // console.table(newRating, name)
        loadProduct();
    }
    return (
        <div>
            <div className='container fluid'>
                <div className='row pt-4' >
                    <SingleProduct product={product} star={star} onStarClick={onStarClick} />
                </div>
                <div className="row p-4">
                    <h4 className='col text-center py-3 mt-3 mb-3 bg-light'>Related Products</h4>
                    {/* {JSON.stringify(related)} */}
                    {related.length > 0 ? (

                        <div className="row">
                            {related.map((p) => (
                                <div key={p._id} className="col-md-3">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    ) : (<div className='row'>No related products</div>)}
                </div>
            </div>


        </div>
    );
};

export default Product;