import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          alt={title}
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "200px", width:"100%" }}
        />
      }

      actions={[<Link to={`/admin/product/${slug}`}><EditOutlined className="text-warning" /></Link>, <DeleteOutlined 
      className="text-danger" onClick={() =>handleRemove(slug)}/>]}
    >
      <Meta title={title} description={`${description.slice(0, 40)}....`} />
    </Card>
  );
};

export default AdminProductCard;
