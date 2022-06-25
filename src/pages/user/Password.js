import React, {useState} from 'react'
import UserNav from '../../components/nav/UserNav';
import {auth} from '../../firebase';
import {  updatePassword } from "firebase/auth";
import { toast } from 'react-toastify';
const Password = () => {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        console.log(password);

        console.log(auth.currentUser)
        const user = auth.currentUser;
        await updatePassword(user, password)
        .then(() =>{
            setLoading(false)
            setPassword("") 
            toast.success("password updated")
        })
        .catch((err) =>{
            setLoading(false)
            toast.error(err.message);
        })

    }
    const passwordUpdateForm = () =>(
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Your Password</label>
                <input type="password"  className='form-control mb-3' onChange={(e) =>setPassword(e.target.value)} value={password} placeholder="update password" disabled={loading} />
                <button type="submit"  className="btn btn-primary btn-lg"  >Submit</button>
            </div>
        </form>
    )
  return (
    <div className='container-fluid'>
     <div className='row'>
        <div className='col-md-2'>
            <UserNav />
        </div>
        <div className='col'>
          {loading ? <h4>Loading</h4> :<h4>Update password</h4>}
          {passwordUpdateForm()}
        </div>
     </div>
    </div>
  )
}

export default Password;