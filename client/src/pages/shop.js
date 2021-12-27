import React, { useEffect, useState } from 'react';
import {getProductsByCount, fetchProductsByFilter} from '../functions/product';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    let {search} = useSelector((state) => ({...state}));
    const {text} = search;

    useEffect(()=> {
        setLoading(true);
        loadAllProducts();
    },[]);


   // load default products
      const loadAllProducts = () => {
          getProductsByCount(12)
          .then((p) => {
              setProducts(p.data);
              setLoading(false);
          });
      }
   // load products on user search input
   const fetchProducts = (text) => {
    fetchProductsByFilter(text).then((res) => setProducts(res.data));
   } 
   useEffect(() => {
     const delayed =setTimeout(() => {
        fetchProducts({query:text});
     }, 300)  
     return () => clearTimeout(delayed) ;  
   }, [text])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    Search/FilterMenu
                </div>
                <div className="col-md-9">
                    {loading ? (<h4 className='text-danger'> Loading</h4> ) : (<h4 className='text-danger'> Products</h4>)}
                    {products.length <1 && <p>No products found</p>}

                    <div className="row">
                        {products.map((p) => (
                            <div key = {p._id} className="col-md-3">
                                <ProductCard product={p} />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;