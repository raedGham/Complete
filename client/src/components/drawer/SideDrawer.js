import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import DefaultImage from '../../images/default.png';



const SideDrawer = () => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }));


    return (

        <Drawer visible={drawer} className='text-center' title="Cart" onClose={() => {
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            })

        }}>

            {cart.map((item) => (
                <div key={item._id} >
                    {item.images[0] ? (
                        <div>
                            <img src={item.images[0].url} style={{ width: '100px' }} />
                            <h6> {item.title}</h6>
                        </div>
                    ) : (
                        <div>
                            <img src={DefaultImage} style={{ width: '100px' }} />
                            <h6> {item.title}</h6>
                        </div>
                    )}
                </div>
            ))
            }

            <Link to="/cart" >
                <button className='btn btn-primary btn-block text-center mt-4' onClick={() => {
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false,
                    })

                }}> Open Cart</button>

            </Link>



        </Drawer >
    );
};

export default SideDrawer;