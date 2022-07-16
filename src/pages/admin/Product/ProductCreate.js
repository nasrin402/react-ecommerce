import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Avatar, Image, Badge } from "antd";
import axios from "axios";
import { Space, Spin } from "antd";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "white", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};
const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res.data);
        window.alert(`${values.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, '---------', e.target.value)
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    //console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      //console.log(res.data);
    });
    setShowSub(true);
  };

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3">
            <AdminNav />
          </div>
          <div className="col-lg-9">
            {loading ? (
              <h2>
                {" "}
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </h2>
            ) : (
              <h4>Create Product</h4>
            )}

            <hr />
            <div className="productForm bg-secondary">
              
              <ProductCreateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                handleCategoryChange={handleCategoryChange}
                subOptions={subOptions}
                showSub={showSub}
                setValues={setValues}
              />
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
