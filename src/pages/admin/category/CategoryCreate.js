import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { Space, Spin } from "antd";


const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  //searching  step 1
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
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
        <CategoryForm
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
      />

        
         
          {/*//step 2  //step 3*/}
          <LocalSearch setKeyword={setKeyword} keyword={keyword}  placeholder="Search Category" />
          
          {/*step-5*/}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-success" key={c._id}>
              {c.name}
              <span className=" btn btn-sm float-right ">
                <DeleteOutlined
                  className="text-danger"
                  onClick={() => handleRemove(c.slug)}
                />
              </span>
              <span className=" btn btn-sm float-right ">
                <Link to={`/admin/category/${c.slug}`}>
                  {" "}
                  <EditOutlined className="text-success" />
                </Link>{" "}
              </span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCreate;
