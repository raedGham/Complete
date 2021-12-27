import React, { useEffect, useState } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons'
const { SubMenu, ItemGroup } = Menu;


const Shop = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        setLoading(true);
        loadAllProducts();
    }, []);


    // 1. load default products
    const loadAllProducts = () => {
        getProductsByCount(12)
            .then((p) => {
                setProducts(p.data);
                setLoading(false);
            });
    }
    // 2. load products on user search input
    const fetchProducts = (text) => {
        fetchProductsByFilter(text).then((res) => setProducts(res.data));
    }
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300)
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range


    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <h5 className='mt-2'>Search/Filter</h5>
                    <hr />
                    <Menu mode="inline" defaultOpenKeys={['1']}>
                        <SubMenu key="1" title={<span className='h6'><DollarOutlined /> Price</span>}>
                            <div>
                                <Slider className="ml-1 mr-4"
                                    tipFormatter={(v) => `$${v}`}
                                    range
                                    value={price}
                                    max="4999"
                                    onChange={(value) => setPrice(value)} />


                            </div>
                        </SubMenu>

                    </Menu>

                </div>
                <div className="col-md-9">
                    {loading ? (<h4 className='text-danger mt-2'> Loading</h4>) : (<h4 className='mt-2'> Products</h4>)}
                    {products.length < 1 && <p>No products found</p>}

                    <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-3">
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