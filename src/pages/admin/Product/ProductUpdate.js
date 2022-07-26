import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProductBySlug, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Avatar, Image, Badge } from "antd";
import axios from "axios";
import { Space, Spin } from "antd";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
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
const ProductUpdate = ({ match, history }) => {
  //const history = useParams()
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const { slug } = match.params;
  const loadProduct = () => {
    getProductBySlug(slug).then((p) => {
      //load single product
      setValues({ ...values, ...p.data });
      //load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      // 3 prepare array of sub ids to show as default sub values in ant design
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      // console.log("ARR", arr)
      setArrayOfSubIds(arr); //required for ant design
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.category = selectedCategory;
    values.subs = arrayOfSubIds;
    updateProduct(slug, values, user.token).then((res) => {
      setLoading(false);
      toast.success(`${res.data.title} is updated`);
      history.push("/admin/products");
    });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, '---------', e.target.value)
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    //console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      //console.log(res.data);
    });
    //if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear pol sub categories ids
    setArrayOfSubIds([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
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
            <h4>Update Product</h4>
          )}

          <hr />
          <br />
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
          <br />
          {/* JSON.stringify(values) */}
          <ProductUpdateForm
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            categories={categories}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
