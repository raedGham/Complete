import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/default.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';




const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, description, slug, price } = product;
  const [tooltip, setTooltip] = useState('Click to add');

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();


  const handleAddToCart = () => {

    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is already in local storage, get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }

      cart.push({ ...product, count: 1 });
      //remove duplicates by using lodash
      let unique = _.uniqWith(cart, _.isEqual);


      localStorage.setItem("cart", JSON.stringify(unique));
      //show tooptip
      setTooltip('Added');

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      })

      // open side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      })

    }

  }
  return (
    <div>
      {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <p className='text-center pt-1 pb-3'> no ratings yet</p>}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt=""
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title}-$${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </div>
  );

};

export default ProductCard;
