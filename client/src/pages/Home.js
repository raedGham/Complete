import React, { useEffect, useState } from 'react';
import { getProductsByCount } from '../functions/product';
const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);




    return (
        <div >
            <div>Home</div>

        </div>
    )
}



export default Home;