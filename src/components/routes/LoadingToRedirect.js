import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () =>{
    const [count, setCount] = useState(5)
    let history = useHistory()

    useEffect(() =>{
        const intervel = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && history.push('/')
        //cleanup
        return () =>clearInterval(intervel)
    }, [count]);

    return (
        <div className='container p-5 text-center'>
            <h1 className='text-danger'>redirecting you in {count} seconds</h1>
        </div>
    )
};

export default LoadingToRedirect;