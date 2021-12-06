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

import { auth } from './firebase';
import { useDispatch } from 'react-redux';



const App = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {

        const idTokenResult = await user.getIdTokenResult();
        console.log("user", idTokenResult.token)
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token }
        })
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
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
