import React, {useEffect,useState} from 'react';
import SingleProduct from '../components/cards/SingleProduct';
import { getProductBySlug, updateStarRating } from '../functions/product';
import { useSelector } from 'react-redux';
const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const {user} = useSelector((state) =>({...state}))
    const {slug} = match.params;
    useEffect(()=>{
        loadProduct();
    },[])

    const loadProduct = () =>{
        getProductBySlug(slug)
        .then((res) =>setProduct(res.data))
        .catch( (err) =>{
            console.log(err)
        })
    }
   
    const onStarRating = (newRating, name) =>{
            setStar(newRating);
            updateStarRating(name, newRating, user.token )
            .then((res) =>{
                console.log(res.data);
            })
            console.log(newRating, name);
    }
    return (
        <div className='container-fluid'>
            {/* JSON.stringify(product) */}
            <div className='row pt-5'>
            <SingleProduct product={product} onStarRating={onStarRating} star={star} />
           </div>

            <div className='row'>
                <div>related products</div>
            </div>
        </div>
    );
}

export default Product;
