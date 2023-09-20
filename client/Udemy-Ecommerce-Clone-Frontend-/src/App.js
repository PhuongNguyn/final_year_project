import './App.scss';
import React from 'react'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FallbackLoading from "./components/FallBackLoading"
import { Suspense } from 'react';
const Home = React.lazy(() => import("./pages/HomePage"))
const SingleCourse = React.lazy(() => import("./pages/SingleCoursePage"))
const Cart = React.lazy(() => import("./pages/CartPage"))
const Courses = React.lazy(() => import("./pages/CoursesPage"))

const Login = React.lazy(() => import("./pages/Login"))
const SignUp = React.lazy(() => import("./pages/SignUp"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoading />}>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:id" element={<SingleCourse />} />
          <Route path="/category/:category" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
