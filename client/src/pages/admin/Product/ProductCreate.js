import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { createProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';



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
    const { user } = useSelector((state) => ({ ...state }));
    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                console.log(res)
                toast.success(`${res.data.title} created Sucessfully`);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }



    const { title, description, price, categories, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">  <AdminNav /></div>
                <div className="col-md-8 text-left">
                    <h4>Create Product</h4>
                    <hr />
                    {/* {JSON.stringify(values)} */}
                    <form onSubmit={handleSubmit}>

                        <div className='form-group mb-2'>
                            <label className='text-primary'>Title</label>
                            <input type="text" name="title" className='form-control' value={title} onChange={handleChange} />
                        </div>

                        <div className='form-group mb-2'>
                            <label className='text-primary'>Description</label>
                            <input type="text" name="description" className='form-control' value={description} onChange={handleChange} />
                        </div>

                        <div className='form-group mb-2'>
                            <label className='text-primary'>Price</label>
                            <input type="number" name="price" className='form-control' value={price} onChange={handleChange} />
                        </div>

                        <div className='form-group mb-2'>
                            <label className='text-primary'> Shipping</label>
                            <select name="shipping" className='form-control' onChange={handleChange}>
                                <option >Please Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='text-primary'>Quantity</label>
                            <input type="number" name="quantity" className='form-control' value={quantity} onChange={handleChange} />
                        </div>

                        <div className='form-group mb-2'>
                            <label className='text-primary'>Color</label>
                            <select name="color" className='form-control' onChange={handleChange}>
                                <option >Please Select</option>
                                {colors.map((c) => (<option key={c} value={c}>{c} </option>))}
                            </select>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='text-primary'>Brand</label>
                            <select name="brand" className='form-control' onChange={handleChange}>
                                <option >Please Select</option>
                                {brands.map((b) => (<option key={b} value={b}>{b} </option>))}
                            </select>
                        </div>
                        <button className='btn btn-outline-primary'> Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ProductCreate;
