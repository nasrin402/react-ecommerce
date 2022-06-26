import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const {user} = useSelector((state) =>({...state}));

  useEffect(()=>{
    loadCategories();
  }, [])
  const loadCategories = () =>{
     getCategories().then((c) => setCategories(c.data));
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(name);
    setLoading(true);
    createCategory({name}, user.token)
    .then(res => {
      setLoading(false);
      setName('')
      toast.success(`"${res.data.name}" is created`)
    })
    .catch(err =>{
      console.log(err)
      setLoading(false)
      if(err.response.status === 400) toast.error (err.response.data);
    })
  }
  const categoryForm = () => <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input 
      type="text" 
      className="form-control mb-3" 
      value={name} 
      onChange={(e) => setName(e.target.value)}
      autoFocus
      required
      />
      <button className="btn btn-outline-prinary">Save</button>
    </div>
  </form>
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
        <h4>Create category</h4>
        {categoryForm()}
        <hr/>
        {categories.length}
        </div>
      </div>
    </div>
  );
};
export default CategoryCreate;
