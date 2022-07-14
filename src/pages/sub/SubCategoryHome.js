import React, {useState, useEffect} from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../functions/sub';



const SubCategoryHome = ({match}) => {
    const [sub, setSub] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
const {slug} = match.params;
useEffect(() =>{
    setLoading(true)
    getSub(slug).then((res) =>{
        setLoading(false)
        setSub(res.data.sub)
        setProducts(res.data.products)
    }).catch (err =>{
        console.log(err)
    })
}, [])
  
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    {loading ? (
                        <h4>Loading</h4>): (<h4 className='text-center jumbotron'>{products.length} products in "{sub.name}" sub category</h4>)
                    }
                </div>
                <div className='row'>
                {products.map((p) =><div className='col-md-4' key={p._id}> <ProductCard product={p}/></div>)}
                   
                </div>
            </div>
      
        </div>
    );
}

export default SubCategoryHome;
