import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';


import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const ProductUpdate = () => {
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
    const { slug } = useParams();
    let navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        loadProduct();
        loadcategories();

    }, []);

    const loadProduct = () => {
        getProduct(slug)
            .then((c) => {
                setValues({ ...values, ...c.data });
                // load category subs
                getCategorySubs(c.data.category._id)
                    .then((res) => setSubOptions(res.data))
                // prepare arr for antd select
                let arr = []
                c.data.subs.map((s) => arr.push(s._id));
                setArrayOfSubIds((prev) => arr);

            }
            );
    }

    const loadcategories = () => {
        getCategories()
            .then((c) => {

                setCategories(c.data)
                console.log("LOAD CATEGORIES:", categories);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        values.subs = arrayOfSubIds;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then(res => {
                setLoading(false);

                toast.success(`${res.data.title} Product updated successfully`);
                navigate("/admin/products");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.err);

            });

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();

        setValues({ ...values, subs: [] });
        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value)
            .then(res => {

                setSubOptions(res.data);

            });
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        setArrayOfSubIds([])


    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">  <AdminNav /></div>
                <div className="col-md-8 text-left">
                    {loading ? <LoadingOutlined className='text-danger h3' /> : <h4>Product Update</h4>}
                    {/* {JSON.stringify(values)} */}
                    <div className='mb-1'>
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        values={values}
                        setValues={setValues}
                        subOptions={subOptions}
                        categories={categories}
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                        selectedCategory={selectedCategory}
                    />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;