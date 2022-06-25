import React, { useState, useEffect} from 'react'
import {auth} from '../../firebase'
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const ForgotPass = ({history}) =>{
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) =>({...state}))
    useEffect(() =>{
        if(user && user.token) history.push('/');
    },[user])

    const handleSubmit = async (e) =>{
        e.preventDefault()
       setLoading(true)
        //const auth = getAuth();
        await sendPasswordResetEmail( auth, email)
        .then(()=>{
            setEmail('')
            setLoading(false)
            toast.success(
                `Email is sent to ${email}. Click the link to complete your registration.`
              );
            history.push('/login')
        })
        .catch((error)=>{
            setLoading(false)
            toast.error(error.message)
            console.log(error)
        })
        
       
          
        
      };
    const forgotPassForm = () => (
        <form onSubmit={handleSubmit}>
          <input type="email" className='form-control mb-3' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <button type="submit" className='btn btn-raised' disabled={!email}>Reset password </button>
        </form>
      )
    return (
        <div className="container p-5">
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              {loading ? (<h3 className='text-danger'>Loading.....</h3>): (<h3>Forgot Password</h3>)}
              {forgotPassForm()}
            </div>
          </div>
        </div>
      )

}
export default ForgotPass;