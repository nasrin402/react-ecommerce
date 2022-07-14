import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(9).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div className="row">
          {products.length < 1 && <p>No products found</p>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 my-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default AllProducts;
