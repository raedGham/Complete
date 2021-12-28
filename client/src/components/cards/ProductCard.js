import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/default.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, description, slug, price } = product;
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
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
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
