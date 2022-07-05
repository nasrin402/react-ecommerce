import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";


const ProductListItems = ({ product }) => {
  const {
    title,
    _id,
    description,
    price,
    category,
    subs,
    sold,
    shipping,
    color,
    brand,
  } = product;

  return (
    <div>
      <h2>{title}</h2>
     <p>rating here</p>
      <h2 className="text-primary">${price}</h2>
      <p>{description}</p>
      <p>select quantity</p>
      <p>Sold: {sold}</p>
      <p>Color: {color}</p>
      <p>Brand: {brand}</p>
      <hr />
      <p>
        Category:{" "}
        {category && (
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        )}
      </p>
      <p>
        Sub Categories:{" "}
        {subs &&
          subs.map((s) => (
            <Link key={s._id} to={`/sub/${s.slug}`}>
              {s.name},{" "}
            </Link>
          ))}{" "}
      </p>
    </div>
  );
};

export default ProductListItems;
