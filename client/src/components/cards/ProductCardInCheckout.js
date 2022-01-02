import React from 'react';
import ModalImage from 'react-modal-image';
import defaultImg from '../../images/default.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'

const ProductCardInCheckout = ({ p }) => {

    const colors = ["Black", "Brown", "Silver", "White", "Blue"];
    const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP"];
    const dispatch = useDispatch();

    const handleColorChange = (e) => {
        //console.log("COLOR changed", e.target.value);

        let cart = [];

        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    product.color = e.target.value;
                }
            });
            //   console.log("CART AFter Update", cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({ type: "ADD_TO_CART", payload: cart });
        }

    }

    const handleQtyChange = (e) => {

        let count = e.target.value < 1 ? 1 : e.target.value;
        if (count > p.quantity) {
            toast.error(`Max available qty:${p.quantity}`);
            return;
        }
        let cart = [];

        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    product.count = count;
                }
            });
            //   console.log("CART AFter Update", cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({ type: "ADD_TO_CART", payload: cart });
        }


    }

    const handleRemove = () => {

        let cart = [];

        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1);
                }
            })
            //  console.log("New cart", cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({ type: "ADD_TO_CART", payload: cart });
        }
    }

    return (
        <tbody>
            <tr >
                <td>
                    <div style={{ width: "100px" }}>
                        {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />) : (<ModalImage small={defaultImg} large={defaultImg} />)}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td> {p.brand}</td>
                <td>
                    <select name="color" onChange={handleColorChange} className='form-control' >
                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                        {colors.filter((c) => c !== p.color).map((c) => <option value={c} key={c} >{c}</option>)}
                    </select>
                </td>
                <td >
                    <input type="number" className="form-control" value={p.count} onChange={handleQtyChange} />
                </td>
                <td className="text-center">
                    {p.shipping === "Yes" ? (<CheckCircleOutlined className="text-success" />) : (<CloseCircleOutlined className="text-danger text-center" />)}
                </td>
                <td className='text-center'>
                    <CloseOutlined className='text-danger' onClick={handleRemove} />
                </td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;