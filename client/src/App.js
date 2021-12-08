import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';


const App = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {

        const idTokenResult = await user.getIdTokenResult();
        console.log("user", idTokenResult.token)

        // sending the token to backend for validation
        currentUser(idTokenResult.token)
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

      }
    })
    return () => unsubscribe();
  }, []);

  return (
    <>

      <BrowserRouter>

        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/register/complete" exact element={<RegisterComplete />} />
          <Route path="/forgot/password" exact element={<ForgotPassword />} />
          <Route path="/user/history" exact element={<History />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
