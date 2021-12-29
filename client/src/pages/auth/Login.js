import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from '../../functions/auth';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => (state));
    const navigate = useNavigate();
    const location = useLocation();
    const roleBasedRedirect = (res) => {

    console.log("location state from in login ", location.state.from);

     let intended = location.state;
        if (intended) {
            navigate(intended.from)
        } else {
            if (res.data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/history");
            }
        }
    }
    useEffect(() => {
        // console.log("Login:", user);
        if (user && user.token) {
            navigate("/")
        }
    }, [user, navigate]);



    let dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const {
                user
            } = result;
            const idTokenResult = await user.getIdTokenResult();
            console.log("USer idTokenResult:", idTokenResult);

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
                            _id: res.data._id
                        }
                    });
                    setLoading(false);
                    roleBasedRedirect(res);
                })
                .catch();




            //     navigate("/");


        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }


    }

    const googleLogin = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const {
                    user
                } = result;
                const idTokenResult = await user.getIdTokenResult();
                // sending the token to backend for validation
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        // console.log("login res.data", res.data)
                        // saving user info to redux state
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        });
                        setLoading(false);
                        roleBasedRedirect(res);
                    })
                    .catch();



                //   navigate("/");
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }



    const loginForm = () => {

        return (<form onSubmit={handleSubmit} >

            <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email" autoFocus />

            <input type="password" className="form-control mt-3" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" />

            <Button
                type="primary"
                className="mt-3 "
                block shape="round"
                icon={< MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
                onClick={handleSubmit} > Log In with Email / Password
            </Button>
        </form>

        )
    }

    return <div className="container p-5" >
        <div className="row" >
            <div className="col-md-6 offset-md-3" >

                {!loading ? <h4> Login </h4> : <h4>Loading...</h4 >}

                {loginForm()}

                <Button
                    type="danger"
                    className="mt-3 "
                    block shape="round"
                    icon={< GoogleOutlined />}
                    size="large"
                    onClick={googleLogin} > Log In with Google Account
                </Button>
                <Link to="/forgot/password" className="float-end mt-2 text-danger" > Forgot Passsword </Link>

            </div>
        </div>

    </div>;
}



export default Login;