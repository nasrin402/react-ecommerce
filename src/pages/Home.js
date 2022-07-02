import React, { useState, useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div>{/* JSON.stringify(products) */}</div>
      <div className="jumbotron">
        {loading ? <h2>Loading...</h2> : <h2>All products</h2>}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
