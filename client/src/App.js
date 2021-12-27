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
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/Category/CategoryCreate';
import CategoryUpdate from './pages/admin/Category/CategoryUpdate';
import SubCreate from './pages/admin/Sub/SubCreate';
import SubUpdate from './pages/admin/Sub/SubUpdate';
import ProductCreate from './pages/admin/Product/ProductCreate';
import ProductUpdate from './pages/admin/Product/ProductUpdate';
import AllProducts from './pages/admin/Product/AllProducts';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/shop';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';


const App = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {

        const idTokenResult = await user.getIdTokenResult();


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
          .catch(
            console.log("failed to validate user @ backend")
          );

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

          <Route path="/user/history" element={
            <UserRoute >
              <History />
            </UserRoute>
          } />



          <Route path="/user/password" element={
            <UserRoute >
              <Password />
            </UserRoute>
          } />



          <Route path="/user/wishlist" element={
            <UserRoute >
              <Wishlist />
            </UserRoute>
          } />

          <Route path="/admin/dashboard" element={
            <AdminRoute >
              <AdminDashboard />
            </AdminRoute>
          } />

          <Route path="/admin/category" element={
            <AdminRoute >
              <CategoryCreate />
            </AdminRoute>
          } />

          <Route path="/admin/category/:slug" exact element={
            <AdminRoute >
              <CategoryUpdate />
            </AdminRoute>
          } />

          <Route path="/admin/sub" exact element={
            <AdminRoute >
              <SubCreate />
            </AdminRoute>
          } />

          <Route path="/admin/sub/:slug" exact element={
            <AdminRoute >
              <SubUpdate />
            </AdminRoute>
          } />

          <Route path="/admin/product" exact element={
            <AdminRoute >
              <ProductCreate />
            </AdminRoute>
          } />

          <Route path="/admin/products" exact element={
            <AdminRoute >
              <AllProducts />
            </AdminRoute>
          } />

          <Route path="/admin/product/:slug" exact element={
            <AdminRoute >
              <ProductUpdate />
            </AdminRoute>
          } />
          <Route path="/product/:slug" exact element={

            <Product />

          } />
          <Route path="/category/:slug" exact element={

            <CategoryHome />

          } />

          <Route path="/sub/:slug" exact element={

          <SubHome />

          } />

          <Route path="/shop" exact element={

          <Shop />

          } />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
