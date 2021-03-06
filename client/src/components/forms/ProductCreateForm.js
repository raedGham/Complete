import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, handleCategoryChange, values, subOptions, showSub, setValues }) => {
    const { title, description, price, categories, subs, quantity, colors, brands } = values;
    return (
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

            <div className='form-group mb-2'>
                <label className='text-primary'>Category</label>
                <select name="category" className='form-control' onChange={handleCategoryChange}>
                    <option >Please Select</option>
                    {categories.map((c) => (<option key={c._id} value={c._id}>{c.name} </option>))}
                </select>
            </div>
            {/* {console.log(categories)} */}


            {showSub && (<div>
                <label className='text-primary'>Sub Categories</label>
                <Select mode="multiple" style={{ width: '100%' }} placeholder='"Please select' value={subs} onChange={(value) => setValues({ ...values, subs: value })} >
                    {subOptions.length && subOptions.map((c) => (<Option key={c._id} value={c._id}>{c.name} </Option>))}
                </Select>
            </div>)}

            <br />
            <button className='btn btn-outline-primary'> Save</button>
        </form>
    );
};

export default ProductCreateForm;