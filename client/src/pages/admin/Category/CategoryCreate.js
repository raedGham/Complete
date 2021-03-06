import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';


const CategoryCreate = () => {
    const { user } = useSelector(state => ({ ...state }));

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // searching/filtering  step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => loadcategories(), []);

    const loadcategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

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



    // step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">  <AdminNav /></div>
                <div className="col-md-8 text-left">
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create Category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                    <hr />

                    {/* steps 2 & 3 */}

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />



                    {/* step 5 */}
                    {categories.filter(searched(keyword)).map((c) => (
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