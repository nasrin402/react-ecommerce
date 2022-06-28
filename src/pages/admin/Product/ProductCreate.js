import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import {
//   createProduct,
// } from "../../../functions/product";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Link, useParams } from "react-router-dom";
// import CategoryForm from "../../../components/forms/CategoryForm";
// import LocalSearch from "../../../components/forms/LocalSearch";

const ProductCreate = () =>{
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    products
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;