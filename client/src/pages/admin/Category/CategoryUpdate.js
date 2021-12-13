import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';


const CategoryUpdate = () => {
    const { user } = useSelector(state => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);



    const { slug } = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        console.log("Params slug:", slug);
        loadCategory();
    }, []);

    const loadCategory = () => {
        getCategory(slug)
            .then((c) => setName(c.data.name));
    }
    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Name object:", { name });
        console.log("Slug:", slug);
        setLoading(true);
        updateCategory(slug, { name }, user.token)
            .then(res => {
                setLoading(false);
                // setName("");
                toast.success(`${res.data.name} category updated successfully`);
                navigate("/admin/category");
            })
            .catch((err) => {
                setLoading(false);

                // if (err.response.status === 400) {
                //     toast.error(err.response.data)
                // }
            });

    }




    const showCategoryForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className='pb-2'>Name</label>
            <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            <button className="btn btn-outline-primary mt-2" type="submit">Save</button>

        </div>
    </form>


    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">  <AdminNav /></div>
                <div className="col text-left">
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Category</h4>}
                    {showCategoryForm()}



                </div>

            </div>
        </div>
    );
};

export default CategoryUpdate;