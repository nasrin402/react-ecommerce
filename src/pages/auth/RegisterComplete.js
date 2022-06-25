import React, { useState, useEffect} from 'react'
import { getAuth,  updatePassword,  isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useDispatch,  useSelector } from "react-redux";
import {createOrUpdateUser} from "../../functions/auth";
import { toast } from 'react-toastify';

 const RegisterComplete =({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {user} = useSelector((state) =>({...state}))
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRagistration'))
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
        const auth = getAuth();
      
        if( signInWithEmailLink(auth, email, window.location.href)){
            // Clear email from storage.
            window.localStorage.removeItem('emailForRagistration');
            const user = auth.currentUser;
            await updatePassword(user, password);
            const idTokenResult = await user.getIdTokenResult();
            // console.log('user', user, "idtoken",idTokenResult )
            createOrUpdateUser(idTokenResult.token)
            .then(res =>{  dispatch({
              type:"LOGGED_IN_USER",
              payload:{
                name:res.data.name,
                email:res.data.email,
                token:idTokenResult.token,
                role:res.data.role,
                _id:res.data._id
              }
            })})
            .catch((err) => console.log(err))
            history.push('/')
        }
           
    } catch(error) {
        toast.error(error.message)
      }
  };
  const registerCompleteForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className='form-control mb-3' value={email} disabled/>
      <input type="password" className='form-control mb-3' value={password} onChange={(e) => setPassword(e.target.value)} autoFocus placeholder='Enter Password'/>
      <button type="submit" className='btn btn-raised'>Complete Registration </button>
    </form>
  )
  return (
    <div className="container p-5">
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h3>Complete Register</h3>
        
          {registerCompleteForm()}
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete;