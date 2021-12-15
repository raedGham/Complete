import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { createProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';


const ProductCreate = () => {
    const initialState = {
        title: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        subs: [],
        shipping: "",
        quantity: "",
        images: [],
        colors: ["Black", "Brown", "Silver", "White", "Blue"],
        brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP"],
        color: "",
        brand: "",
    };
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                toast.success(`${res.data.title} created Sucessfully`)
                setInterval(() => window.location.reload(), 1000);

            })
            .catch(err => {
                console.log("create Product catch err", err.response)
                if (err.response.status === 400) toast.error(err.response.data.err);
            });
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('Clicked category', e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then(res => {
                console.log("CATEGORY CLICK RESPONSE ", res.data);
                setSubOptions(res.data);
                setShowSub(true);
            });
    }

    const loadcategories = () => {
        getCategories()
            .then((c) => setValues({ ...values, categories: c.data }))
    }

    useEffect(() => { loadcategories() }, []);


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">  <AdminNav /></div>
                <div className="col-md-8 text-left">
                    <h4>Create Product</h4>
                    <hr />
                    {/* {JSON.stringify(values.subs)}  */}
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        values={values}
                        setValues={setValues}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}


export default ProductCreate;
