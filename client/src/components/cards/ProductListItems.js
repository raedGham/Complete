import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
    const { price, category, subs, shipping, color, brand, sold, quantity } = product;
    return (
        <div>
            <ul className='list-group'>
                <li className='list-group-item'>
                    Price {" "} <span className='label label-default label-pill float-sm-end'>${price}</span>
                </li>
                {category && <li className='list-group-item'>
                    Category {" "} <Link to={`/category/${category.slug}`} className='label label-default label-pill float-sm-end' >{category.name}</Link>
                </li>}

                {subs && (
                    <li className='list-group-item'>
                        Sub Categories
                        {subs.map((sub) => (
                            <Link to={`/sub/${sub.slug}`} className='label label-default label-pill float-sm-end' >  {sub.name} </Link>
                        ))}

                    </li>
                )}



                <li className='list-group-item'>
                    Shipping {" "} <span className='label label-default label-pill float-sm-end'>{shipping}</span>
                </li>
                <li className='list-group-item'>
                    Color {" "} <span className='label label-default label-pill float-sm-end'>{color}</span>
                </li>
                <li className='list-group-item'>
                    Brand {" "} <span className='label label-default label-pill float-sm-end'>{brand}</span>
                </li>
                <li className='list-group-item'>
                    Available Qty {" "} <span className='label label-default label-pill float-sm-end'>{quantity}</span>
                </li>
                <li className='list-group-item'>
                    Sold Qty {" "} <span className='label label-default label-pill float-sm-end'>{sold}</span>
                </li>
            </ul>
        </div>
    );
};

export default ProductListItems;