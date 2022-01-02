import React from 'react';

const Checkout = () => {
    const saveAddressToDb = () => {
        //
    }
    return (
        <div className='row'>
            <div className="col-md-6">
                <h5>Delivery Address</h5>
                <br />
                <br />
                <textarea name="" id="" cols="30" rows="10">text</textarea>
                <br />
                <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>Save</button>

                <hr />
                <h5>Got Coupons?</h5>
                <br />
                <br />
            </div>

            <div className="col-md-6">
                <h5>Order Summary</h5>
                <div className="row">

                    <div className="col-md-6">
                        <button className='btn btn-primary'>Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button className='btn btn-primary'>Empty Cart</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;