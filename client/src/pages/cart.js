import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
const Cart = () => {
    const {cart, user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTotal = () => {
        return cart.reduce((a,b) => {
            return a + b.count * b.price
        }, 0)
    }
    const showCartItems = () => {
        return (
        <table className='table table-light'>
            <thead className='thead'>
                <tr> 
                   <th scope="col">Image</th> 
                   <th scope="col">Title</th> 
                   <th scope="col">Price</th> 
                   <th scope="col">Brand</th> 
                   <th scope="col">Color</th> 
                   <th scope="col">Count</th> 
                   <th scope="col">Shipping</th> 
                   <th scope="col">Remove</th> 
                </tr>                
            </thead>            
         
         {cart.map((p)=> (<ProductCardInCheckout key= {p._id} p={p}/>))}

        </table>);
    }

    const SaveOrderToDb = () => {
//
    }

    const handleLogin  = () => {
        navigate("/login ", { state: { from: "/cart" } })
    }
    return (
        <div className='container-fluid p-4'>
            <div className="row">
              <h5> Cart </h5>
               <div className="row">
                   <div className="col-md-9">
                     {!cart.length ? <p>No items in the cart  <Link to="/shop">Continue shopping</Link> </p> : (showCartItems()) }    
                   </div>

                   <div className="col-md-3">
                   <h5> Order Summary </h5>
                   <hr/>
                   <b>Products</b>
                     {cart.map((c,i) => (
                         <div key={i}>
                             <p> {c.title} x {c.count} = ${c.price * c.count}</p>
                         </div>
                     ))}
                   <hr/>  
                   <b> Total: ${getTotal()}</b>
                   <hr/> 
                   
                    {(user)  ? ( <button className ='btn btn-sm btn-primary mt-1' onClick={SaveOrderToDb} disabled = {!cart.length} >Proceed to Checkout</button>) :
                             ( <button className ='btn btn-sm btn-primary mt-1' disabled = {!cart.length}  onClick={handleLogin}>Login to Checkout</button>) }
                   </div>
               </div>
            </div>
            
        </div>
    );
};

export default Cart;