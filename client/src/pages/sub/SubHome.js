import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../functions/sub';
import LoadingCard from '../../components/cards/LoadingCard';
import { useParams } from 'react-router-dom';

const SubHome = () => {
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    console.log(slug);
    useEffect(() => {
        setLoading(true);
        getSub(slug).then(res => {
            setSub(res.data.sub);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, [])
    return (
        <>
            {/* {JSON.stringify(sub)} */}

            <div className="container">
                {loading ? (
                    <LoadingCard count={4} />
                ) : (
                    <>
                        <h4> {products.length} Products in `"{sub.name}"` sub category`</h4>
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

export default SubHome;