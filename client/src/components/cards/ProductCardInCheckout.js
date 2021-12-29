import React from 'react';
import ModalImage from 'react-modal-image';
import defaultImg from '../../images/default.png';
import {useDispatch} from 'react-redux';

const ProductCardInCheckout = ({p}) => {

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
             if(product._id === p._id) {
                 product.color = e.target.value;
             }
         });
        //   console.log("CART AFter Update", cart);
         localStorage.setItem("cart", JSON.stringify(cart)) ;
         dispatch({type:"ADD_TO_CART", payload: cart });
       }

    }
    return (
        <tbody>
            <tr >
                <td> 
                    <div style={{width:"100px"}}>
                      {p.images.length ? (<ModalImage small={p.images[0].url}  large={p.images[0].url}/>) : ( <ModalImage small={defaultImg}  large={defaultImg} /> )}    
                   </div>
                 </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select name = "color" onChange={handleColorChange} className='form-control' >
                          { p.color? <option value={p.color}>{p.color}</option>: <option>Select</option>}
                          {colors.filter((c) => c !== p.color ).map((c)=> <option  value = {c}  key ={c} >{c}</option>) }
                    </select>
                </td>
                <td>{p.count}</td>
                <td>shipping</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;