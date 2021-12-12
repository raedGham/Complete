import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryCreate = () => {
    const { user } = useSelector(state => ({ ...state }));

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => loadcategories(), []);

    const loadcategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true);
        createCategory({ name }, user.token)
            .then(res => {
                setLoading(false);
                setName("");

                toast.success(`${res.data.name} category created successfully`);
                loadcategories();

            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            });

    }


    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} category Sucessfully Deleted`);
                    loadcategories();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data)
                });

        }

    };

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
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create Category</h4>}
                    {showCategoryForm()}
                    <hr />

                    {categories.map((c) => (
                        <div key={c._id} className='alert alert-secondary'>{c.name}
                            <span className='btn btn-sm float-end' onClick={() => handleRemove(c.slug)}>
                                <DeleteOutlined className='text-danger' />
                            </span>
                            <span className='btn btn-sm float-end'>
                                <Link to={`/admin/category/${c.slug}`}><EditOutlined className='text-primary' /></Link>
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CategoryCreate;