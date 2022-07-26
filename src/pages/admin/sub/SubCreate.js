import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
const SubCreate = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  //searching  step 1
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const loadSubs = () => {
    getSubs().then((c) => setSubs(c.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    createSub({ name, parent:category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs()
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs()
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
    <div className="container-fluid ">
    <div className="row border-top px-xl-5">
      <div className="col-lg-3">
        <AdminNav />
      </div>
      <div className="col-lg-9">
          {loading ? (
            <h4 className="text-danger">Loading......</h4>
          ) : (
            <h4>Create Sub category</h4>
          )}
          <div className="productForm bg-secondary">
            <div className="form-group">
              <label>Parent Category</label>
              <select name="category" className="form-control" 
              onChange={(e) => setCategory(e.target.value)}
              >
              <option>Please Select Parent Category</option>
              {categories.length > 0 && categories.map((c) =>(
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
              </select>
            </div>
            
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/*//step 2  //step 3*/}
          <LocalSearch setKeyword={setKeyword} keyword={keyword} placeholder="Search Sub Category"/>
          
          {/*step-5*/}
          {subs.length > 0 && subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-success" key={s._id}>
              {s.name}
              <span className=" btn btn-sm float-right ">
                <DeleteOutlined
                  className="text-danger"
                  onClick={() => handleRemove(s.slug)}
                />
              </span>
              <span className=" btn btn-sm float-right ">
                <Link to={`/admin/sub/${s.slug}`}>
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
export default SubCreate;
