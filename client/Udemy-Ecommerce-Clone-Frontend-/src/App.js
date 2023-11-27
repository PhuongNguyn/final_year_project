import './App.scss';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FallbackLoading from "./components/FallBackLoading"
import { Suspense } from 'react';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/slice/user.slice';
import { getTokenFromLocalStorage, getUserFromLocalStorage } from './utils';
import UserProfile from './pages/UserProfile';
import Footer from './components/Footer';
import SocketProvider from './context/SocketProvider';

const Home = React.lazy(() => import("./pages/HomePage"))
const SingleCourse = React.lazy(() => import("./pages/SingleCoursePage"))
const Cart = React.lazy(() => import("./pages/CartPage"))
const Courses = React.lazy(() => import("./pages/CoursesPage"))
const Login = React.lazy(() => import("./pages/Login"))
const SignUp = React.lazy(() => import("./pages/SignUp"))

function App() {
  const { loading } = useSelector(state => state.themes)
  const {user} = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(login({ user: getUserFromLocalStorage(), token: getTokenFromLocalStorage() }))
  }, [])

  return (
    <BrowserRouter>
    <SocketProvider token={getTokenFromLocalStorage()} user={user}>
      <Suspense fallback={<FallbackLoading />}>
        {loading && <Loading />}
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:id" element={<SingleCourse />} />
          <Route path="/category/:category" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/user-profile' element={<UserProfile />} />
        </Routes>
        <Footer />
      </Suspense>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
