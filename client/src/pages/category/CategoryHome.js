import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getCategory } from '../../functions/category';
import LoadingCard from '../../components/cards/LoadingCard';
import { useParams } from 'react-router-dom';

const CategoryHome = () => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    console.log(slug);
    useEffect(() => {
        setLoading(true);
        getCategory(slug).then(res => {
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, [])
    return (
        <>
            {/* {JSON.stringify(category)} */}

            <div className="container">
                {loading ? (
                    <LoadingCard count={4} />
                ) : (
                    <>
                        <h4> {products.length} Products in `"{category.name}"` category`</h4>
                        <div className="row">
                            {products.map((product) => (
                                <div key={product._id} className="col-md-3">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {/* <Pagination current={page} total={( Math.floor(productsCount / 4)+1) * 10} onChange={(value) => setPage(value)} className="text-center m-3" />   */}
        </>
    );
};

export default CategoryHome;