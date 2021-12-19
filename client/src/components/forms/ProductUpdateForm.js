import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const ProductUpdateForm = ({ handleSubmit, handleChange, handleCategoryChange, values, subOptions, setValues, categories, arrayOfSubIds, setArrayOfSubIds, selectedCategory }) => {
    const { title, description, price, subs, quantity, images, colors, brands, color, shipping, brand, category } = values;

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
                <select name="shipping" className='form-control' onChange={handleChange} value={shipping === "Yes" ? "Yes" : "No"}>
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
                <select value={color} name="color" className='form-control' onChange={handleChange}>
                    {colors.map((c) => (<option key={c} value={c}>{c} </option>))}
                </select>
            </div>

            <div className='form-group mb-2'>
                <label className='text-primary'>Brand</label>
                <select value={brand} name="brand" className='form-control' onChange={handleChange}>

                    {brands.map((b) => (<option key={b} value={b}>{b} </option>))}
                </select>
            </div>

            <div className='form-group mb-2'>
                <label className='text-primary'>Category</label>
                <select name="category"
                    className='form-control'
                    value={selectedCategory ? selectedCategory : category._id}
                    onChange={handleCategoryChange}>

                    {categories.map((c) => (<option key={c._id} value={c._id}>{c.name} </option>))}
                </select>
            </div>



            <div>
                <label className='text-primary'>Sub Categories</label>
                <Select mode="multiple" style={{ width: '100%' }} placeholder='"Please select' value={arrayOfSubIds} onChange={(value) => setArrayOfSubIds(value)} >
                    {subOptions.length && subOptions.map((c) => (<Option key={c._id} value={c._id}>{c.name} </Option>))}
                </Select>
            </div>

            <br />
            <button className='btn btn-outline-primary'> Update</button>
        </form>
    );
};

export default ProductUpdateForm;