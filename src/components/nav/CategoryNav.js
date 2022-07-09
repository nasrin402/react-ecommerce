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
        <div>
            {categories.map((c) => <div className="btn btn-outlined-primary btn-lg btn-block btn-raised text-success" key={c._id}><Link to={`/category/${c.slug}`}>{c.name}</Link></div>)}
        </div>
    )

}

export default CategoryNav;