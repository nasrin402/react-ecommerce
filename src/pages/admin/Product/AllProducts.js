import React, { useState, useEffect } from "react";
import { Space, Spin } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { deleteProduct, getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) =>({...state}));
  useEffect(() => {
    setLoading(true);
    loadAllProducts();
  }, []);
  const loadAllProducts = () =>{
    setLoading(true);
    getProductsByCount(100)
    .then((res) => {
      setProducts(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }
const handleRemove =(slug) =>{
    let answer = window.confirm("Delete?")
    if(answer){
       //console.log("send delte request", slug)
       deleteProduct(slug, user.token)
       .then(res =>{
        loadAllProducts();
        toast.error(`${res.data.title} is deleted`)
       } )
       .catch(err =>{
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
       })
    }
}
  return (
    <div className="container-fluid ">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3">
          <AdminNav/>
        </div>
        <div className="col-md-9">
          {loading ? (
            <h2>
              {" "}
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </h2>
          ) : (
            <h2>All products</h2>
          )}
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4"  key={product._id}>
                <AdminProductCard product={product} handleRemove={handleRemove}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
