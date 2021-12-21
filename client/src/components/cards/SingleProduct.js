import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import defaultPicture from '../../images/default.png';
import ProductListItems from './ProductListItems';
const { TabPane } = Tabs;






const SingleProduct = ({ product }) => {
  const { title, images, description } = product;
  return (
    <>

      <div className='col-md-6'>
        {images && images.length ? (
          <Carousel >
            {images && (images.map((i) => <img src={i.url} key={i.public_id} />))}
          </Carousel>) :
          (
            <Card
              cover={<img src={defaultPicture} style={{ height: "350px", objectFit: "cover" }} className='mb-3' />}>
            </Card>
          )}

        <Tabs type='card'>
          <TabPane tab='Description' key="1">{description && description}</TabPane>
          <TabPane tab='More' key="2"> call us on ....</TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h2 className='bg-secondary text-light py-1 px-2 '> {title}</h2>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add To Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-primary" /> <br /> Add To WishList
            </Link>,
            <>
              <StarOutlined className="text-danger" /> <br /> Login to Leave Rating
            </>,
          ]}

        >


          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
