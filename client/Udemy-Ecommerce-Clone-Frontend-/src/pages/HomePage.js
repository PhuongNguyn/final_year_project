import React, { useEffect, useState } from 'react';
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import CategoriesList from "../components/CategoriesList";
import APIService from '../services';


const HomePage = () => {
  const [categoryHome, setCategoryHome] = useState([])

  const getCategoryHome = async () => {
    const api = new APIService()

    try {
      const result = await api.getCategoryHome()

      setCategoryHome(result.data?.result || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategoryHome()
  }, [])
  return (
    <div className='holder'>
      <Hero />
      <CoursesList categories={categoryHome} />
      <CategoriesList />
    </div>
  )
}

export default HomePage