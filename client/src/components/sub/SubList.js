import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';


const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getSubs().then(s => {
            setLoading(false);
            setSubs(s.data);
        })

    }, [])



    return (
        <div className='container fluid'>
            <div className='row'>
                {/* {JSON.stringify(categories)} */}
                <div className='col text-center'>

                    {loading ? "Loding..." : subs.map(s => <div key={s._id} className='btn btn-outline-secondary btn-block m-2'> <Link to={`/sub/${s.slug}`} >{s.name}</Link> </div>)}
                </div>

            </div>
        </div>
    );
};

export default SubList;