import React from 'react';
import { Card } from 'antd';
import defaultImage from '../../images/default.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
    const { title, description, images, slug } = product;
    console.log(images);
    return (
        <Card
            hoverable
            style={{ width: 220, height: 260 }}
            cover={images.length > 0 ? <img className='mx-4 mt-2' style={{ width: "170px", objectFit: "cover" }} alt="example" src={images[0].url} />
                : <img className='mx-4 mt-2' style={{ width: "170px", objectFit: "cover" }} alt="example" src={defaultImage} />}
            actions={[<Link to={`/admin/product/${slug}`}> <EditOutlined className='text-primary' /> </Link>
                , <DeleteOutlined className='text-danger' onClick={() => handleRemove(slug)} />]}
        >

            <Meta title={title} description={`${description && description.substring(0, 15)}...`} />
        </Card>

    );
};




export default AdminProductCard;