import React, { useState, useEffect} from 'react'
import {auth} from '../../firebase'
import { sendSignInLinkToEmail } from "firebase/auth";
import {  useSelector } from "react-redux";

import { toast } from 'react-toastify';

 const Register =({history}) => {
  const [email, setEmail] = useState();
  const {user} = useSelector((state) =>({...state}))
  useEffect(() =>{
      if(user && user.token) history.push('/');
  },[user])
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("emial-link: ",process.env.REACT_APP_REGISTER_REDIRECT_URL )
    const config = {
      url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    //const auth = getAuth();
    await sendSignInLinkToEmail(auth, email, config)
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
      // save user email local storage

      window.localStorage.setItem('emailForRagistration', email)

      //clear state
      setEmail('');
    
  };
  const registerForm = () => (
    /* <form onSubmit={handleSubmit}>
      <input type="email" className='form-control mb-3' value={email} onChange={e => setEmail(e.target.value)} autoFocus/>
      <button type="submit" className='btn btn-raised'>Register </button>
    </form> */
    <form onSubmit={handleSubmit}>
    <div class="form-group">
      <input
        type="email"
        class="form-control border-0 py-4"
        placeholder="Enter Email"
        required="required"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
   
    <div>
      <button
        class="btn btn-primary btn-block border-0 py-3 mb-3"
        type="submit"
      >
     Register
      </button>
    </div>
  </form>
  )
  return (
    <div className="container p-5">
      <div className='row'>
        <div className='col-md-6 offset-md-3 bg-secondary loginForm'>
          <h3>Register</h3>
        
          {registerForm()}
        </div>
      </div>
    </div>
  )
}

export default Register;