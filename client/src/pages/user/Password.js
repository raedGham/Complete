import React , {useState} from 'react';
import UserNav from '../../components/nav/UserNav';
import {auth } from '../../firebase';
import {toast} from 'react-toastify';
import {updatePassword } from 'firebase/auth'
const Password = () => {
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
const handleSubmit = async (e) => {
    e.preventDefault();
   setLoading(true);
   
  await updatePassword(auth.currentUser, password)
  .then(()=> {
      //
      setLoading(false);
      setPassword("");
      toast.success("Password Updated");
  })
  .catch(err => {
    setLoading(false);
    toast.error(err.message);
  });

} 


const passwordUpdateForm = () => {
    return(
    <form onSubmit = {handleSubmit}>
        <div className='form-group'>
            <label> Your Password</label>
            <input type = 'password' onChange={(e)=> setPassword(e.target.value)} value ={password} className='form-control' placeholder="Enter new password" disabled={loading}/>
            <br/>
            <button className='btn btn-primary' disabled = {!password || password.length < 6|| loading}> Submit</button>
        </div>
    </form>)
}

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1">  <UserNav/></div>
                <div className='col-md-2 text-left'>
                   {loading ? <h4 className='text-danger'>Loading ...</h4> : <h5 >Password Update</h5> }
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default Password;

