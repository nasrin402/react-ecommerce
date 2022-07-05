
import React,{useState} from "react";
import { Card, } from "antd";
import laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const ProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  

  return (
    <> 
    
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
       title={title} description={`${description.slice(0, 40)}....`} />
   
    </Card>
    </>
  );
};

export default ProductCard;
