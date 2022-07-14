import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import { getSubs } from "../../functions/sub";

const SubCategoryNav = () =>{
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        getSubs().then((s)=>{
            setSubs(s.data);
            setLoading(false);
        })
    },[]);

   

    return (
        <div>
            {subs.map((s) => <span className="btn btn-outlined-primary  mr-3 btn-large btn-raised text-success" key={s._id}><Link to={`/sub/${s.slug}`}>{s.name}</Link></span>)}
        </div>
    )

}

export default SubCategoryNav;