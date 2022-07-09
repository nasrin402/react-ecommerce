import React, {useState, useEffect} from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getCategory } from '../../functions/category';



const CategoryHome = ({match}) => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
const {slug} = match.params;
useEffect(() =>{
    setLoading(true)
    getCategory(slug).then((res) =>{
        setLoading(false)
        setCategory(res.data.category)
        setProducts(res.data.products)
    }).catch (err =>{
        console.log(err)
    })
}, [])
    console.log(category.name)
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    {loading ? (
                        <h4>Loading</h4>): (<h4 className='text-center jumbotron'>{products.length} products in "{category.name}" category</h4>)
                    }
                </div>
                <div className='row'>
                {products.map((p) =><div className='col-md-4' key={p._id}> <ProductCard product={p}/></div>)}
                   
                </div>
            </div>
      
        </div>
    );
}

export default CategoryHome;
