import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getCategories().then(c => {
            setLoading(false);
            setCategories(c.data);
        })

    }, [])



    return (
        <div className='container fluid'>
            <div className='row'>
                {/* {JSON.stringify(categories)} */}
                <div className='col text-center'>

                    {loading ? "Loding..." : categories.map(c => <div key={c._id} className='btn btn-outline-secondary btn-block m-2'> <Link to={`/category/${c.slug}`} >{c.name}</Link> </div>)}
                </div>

            </div>
        </div>
    );
};

export default CategoryList;