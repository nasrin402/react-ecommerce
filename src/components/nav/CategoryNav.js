import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import { getCategories } from "../../functions/category";

const CategoryNav = () =>{
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        getCategories().then((c)=>{
            setCategories(c.data);
            setLoading(false);
        })
    },[]);

   

    return (
        <div className="text-center">
        <span className="btn btn-outlined-primary btn-lg mr-3 btn-raised text-success">All</span>
            {categories.map((c) => <span className="btn btn-outlined-primary btn-lg mr-3 btn-raised text-success" key={c._id}><Link to={`/category/${c.slug}`}>{c.name}</Link></span>)}
        </div>
    )

}

export default CategoryNav;