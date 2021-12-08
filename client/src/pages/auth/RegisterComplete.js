import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {useDispatch,  useSelector} from 'react-redux';
import {createOrUpdateUser} from '../../functions/auth';


const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {user} = useSelector((state) => (state));
   let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await signInWithEmailLink(auth,
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

             // sending the token to backend for validation
             createOrUpdateUser(idTokenResult.token)
             .then((res) => {
                 // saving user info to redux state
                 dispatch({
                     type: "LOGGED_IN_USER",
                     payload: {
                         name: res.data.name,
                         email: res.data.email,
                         token: idTokenResult.token,
                         role: res.data.role,
                         _id: res.data.id
                     }
                 });
               
             })
             .catch();

        // redirect
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
