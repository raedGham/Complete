import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import {createSub, removeSub, getSubs} from '../../../functions/sub';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';


const SubCreate = () => {
    const { user } = useSelector(state => ({ ...state }));

    const [name, setName] = useState("");
    
    // for parent select dropdown
    const [category, setCategory] = useState("");

    // to populate dropdown
    const [categories, setCategories] = useState([]);
    
    // for subs list
    const [subs, setSubs] = useState([]);


    const [loading, setLoading] = useState(false);

    // searching/filtering  step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
               loadcategories();
               loadsubs();
              }, []);

    const loadcategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
    }

    const loadsubs = () => {
        getSubs()
            .then((s) => setSubs(s.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        createSub({ name , parent:category}, user.token)
            .then(res => {
                setLoading(false);
                setName("");

                toast.success(`${res.data.name} Sub category created successfully`); 
                loadsubs();            

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
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} Sub Category Sucessfully Deleted`);
                    loadsubs();
                  
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
                <div className="col text-left">
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create Sub Category</h4>}

                    <div className='form-group'>
                        <label>Parent Category</label>
                        <select name="category" className="form-control mt-2 mb-2" onChange={(e)=>  {
                                                                                                setCategory(e.target.value);
                                                                                                  loadsubs();
                                                                                                  }
                                                                                                  }>
                            <option>Please Select</option>
                           {categories.length>0 && categories.map((c) => (
                               <option key={c._id} value = {c._id} > {c.name}</option>
                           ))}
                        </select>
                    </div>
                    {/* {JSON.stringify(category)} */}

                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                    <hr />

                    {/* steps 2 & 3 */}

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />



                    {/* step 5 */}
                    {subs.filter(searched(keyword)).map((c) => (
                        <div key={c._id} className='alert alert-secondary'>{c.name}
                            <span className='btn btn-sm float-end' onClick={() => handleRemove(c.slug)}>
                                <DeleteOutlined className='text-danger' />
                            </span>
                            <span className='btn btn-sm float-end'>
                                <Link to={`/admin/sub/${c.slug}`}><EditOutlined className='text-primary' /></Link>
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SubCreate;