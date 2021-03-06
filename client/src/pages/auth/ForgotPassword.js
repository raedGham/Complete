import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from "firebase/auth"


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => (state))
    let navigate = useNavigate();

    useEffect(() => {

        console.log("Forgot:", user);
        if (user && user.token) {
            navigate("/")
        }
    }, [user, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL || process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL1,
            handleCodeInApp: true
        };

        await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your Emial for password reset link");

            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4>Loading</h4> : <h4> Forgot Password</h4>}

            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" autoFocus />
                <br />
                <button className="btn btn-primary" disabled={!email}>Submit</button>
            </form>

        </div>
    )
}

export default ForgotPassword;