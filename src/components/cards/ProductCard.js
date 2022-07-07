
import React,{useState} from "react";
import { Card, } from "antd";
import laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;
const ProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  
  return (
    <div> 
    {product && product.ratings && product.ratings.length > 0 ? (showAverage(product)) : (<h5 style={{display:"inline-block", }}>No ratings yet</h5>)}
     
    <Card
      hoverable
      cover={
        <img
          alt={title}
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "200px", width:"100%" }}
        />
      }
      actions={[<Link to={`/product/${slug}`}><EyeOutlined className="text-success" /> <br/>View Product</Link>,
      <div>
      <ShoppingCartOutlined 
      className="text-success" />
      <br/> Add to cart
      </div>
   ]}
    >
  
      <Meta 
       title={title} description={description} />
       
    </Card>
    
    </div>
  );
};

export default ProductCard;
