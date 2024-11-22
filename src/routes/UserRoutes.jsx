import React,{Suspense,lazy} from "react";
import { useSelector } from "react-redux";
import {Routes,Route,Navigate} from 'react-router-dom'
import LoadingSpinner from "../components/LoadingSpinner";

const UserLogin = lazy(()=>import('../pages/LoginPage'))
const UserSignup = lazy(()=>import('../pages/SIgnUpPage'))
const Home = lazy(()=>import('../pages/Home'))



const UserRoutes = () => {
   const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
            <Route path="" element={ <Navigate to='/login' />} />
            <Route path="login" element={isAuthenticated ?  <Navigate to='/home' /> :<UserLogin/>} />
            <Route path="signup" element={isAuthenticated ?  <Navigate to='/home' /> :<UserSignup/>} />
            <Route path="Home" element={isAuthenticated ?  <Home /> :<Navigate to='/login' />} />

        </Routes>
    </Suspense>
  )
}

export default UserRoutes
