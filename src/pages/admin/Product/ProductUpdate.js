import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {  getProductBySlug } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Avatar, Image, Badge } from "antd";
import axios from "axios";


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
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP"],
  color: "",
  brand: "",
};
const ProductUpdate = ({match}) => {
    const [values, setValues] = useState(initialState);
    // const [subOptions, setSubOptions] = useState([]);
    // const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
      loadProduct()
    }, []);
  
   
    const {slug} = match.params
    const loadProduct = () =>{
        getProductBySlug(slug).then((p) =>{
          setValues({...values, ...p.data})});
    }

 
  
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col-md-10">
        <h4>Update Product</h4>
       
        <hr />
       {JSON.stringify(values)}
      
       
      </div>
    </div>
  </div>
  );
};

export default ProductUpdate;
