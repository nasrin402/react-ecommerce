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
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Link, useParams } from "react-router-dom";
// import CategoryForm from "../../../components/forms/CategoryForm";
// import LocalSearch from "../../../components/forms/LocalSearch";

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
  const handleCategoryChange = (e) =>{
    e.preventDefault()
    //console.log("clicked category", e.target.value);
    setValues({...values, subs:[], category: e.target.value});
    getCategorySubs(e.target.value).then((res) =>{
      setSubOptions(res.data);
      //console.log(res.data);
    });
    setShowSub(true)
  }
  // const handleImageRemove = (public_id) => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API}/removeimage`,
  //       { public_id },
  //       {
  //         headers: {
  //           authtoken: user ? user.token : "",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setLoading(false);
  //       const { images } = values;
  //       let filteredImages = images.filter((item) => {
  //         return item.public_id !== public_id;
  //       });
  //       setValues({ ...values, images: filteredImages });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Create Product</h4>
         
          <hr />
         {JSON.stringify(values.images)}
        
         <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange = {handleCategoryChange}
            subOptions = {subOptions}
            showSub = {showSub}
            setValues={setValues}
         
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
