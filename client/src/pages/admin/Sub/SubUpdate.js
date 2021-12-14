import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';
import CategoryForm from '../../../components/forms/CategoryForm';



const SubUpdate = () => {
    const { user } = useSelector(state => ({ ...state }));

    const [name, setName] = useState("");

    // for parent select dropdown
    const [parent, setParent] = useState("");

    // to populate dropdown
    const [categories, setCategories] = useState([]);


    const [loading, setLoading] = useState(false);

    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadcategories();
        loadsub();
    }, []);

    const loadcategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
    }

    const loadsub = () => {
        getSub(slug)
            .then((s) => {
                setName(s.data.name);
                setParent(s.data.parent);
            })

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        updateSub(slug, { name, parent }, user.token)
            .then(res => {
                setLoading(false);
                setName("");

                toast.success(`${res.data.name} Sub category updated successfully`);
                navigate('/admin/sub');

            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            });

    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">  <AdminNav /></div>
                <div className="col-md-8 text-left">
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Sub Category</h4>}

                    <div className='form-group'>
                        <label>Parent Category</label>
                        <select name="category" className="form-control mt-2 mb-2" onChange={(e) => setParent(e.target.value)}>
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option key={c._id} value={c._id} selected={c._id === parent} > {c.name} </option>
                            ))}
                        </select>
                    </div>


                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                </div>

            </div>
        </div>
    );
};

export default SubUpdate;