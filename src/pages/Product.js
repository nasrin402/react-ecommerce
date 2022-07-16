import React, { useEffect, useState } from "react";
import SingleProduct from "../components/cards/SingleProduct";
import {
  getProductBySlug,
  updateStarRating,
  getRelated,
} from "../functions/product";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = () => {
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data);
        //load relasted product
        getRelated(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onStarRating = (newRating, name) => {
    setStar(newRating);
    updateStarRating(name, newRating, user.token).then((res) => {
      console.log(res.data);
      loadProduct();
    });
    console.log(newRating, name);
  };
  return (
    <div className="container">
      {/* JSON.stringify(product) */}
      <div className="row pt-5">
        <SingleProduct
          product={product}
          onStarRating={onStarRating}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col-md-12 text-center pt-5 pb-5">
          <h4>Related products</h4> <hr />{" "}
        </div>
        {/* JSON.stringify(related) */}
      </div>
      <div className="row pb-5">
        {related.length > 0
          ? related.map((r) => (
              <div key={r._id} className="col-md-3">
                <ProductCard product={r} />
              </div>
            ))
          : <div className="col-md-12 mt-4 text-center"><h3>No products found</h3></div>}
      </div>
    </div>
  );
};

export default Product;
