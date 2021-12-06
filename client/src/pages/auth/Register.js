import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { sendSignInLinkToEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



const Register = () => {

    const [email, setEmail] = useState("");

    const {user} = useSelector((state)=> (state));

    const navigate = useNavigate();

    
    useEffect(()=> {
        console.log("Login:",user);
        if(user && user.token) {
            navigate("/")
        }},[user]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await sendSignInLinkToEmail(auth, email, config);
        toast.success(
            `Email is sent to ${email} , click the link to complete your registration.`
        );
        window.localStorage.setItem("emailForRegistration", email);

        setEmail("");
    }

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" autoFocus/>
          
                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>

        )
    }

    return <div className="container p-5">

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>

                {registerForm()}
            </div>
        </div>

    </div>;
}



export default Register;