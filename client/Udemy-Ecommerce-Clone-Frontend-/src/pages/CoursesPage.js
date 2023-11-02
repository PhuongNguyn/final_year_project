import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Course from "../components/Course";
import APIService from '../services';
import Pagination from '../components/Pagination';
import { useDispatch } from "react-redux"
import { changeLoadingState } from '../redux/slice/theme.slice';

const CoursesPage = () => {
  const { category } = useParams();

  const api = new APIService()
  const [courses, setCourses] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)
  const [totalDoc, setTotalDoc] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const dispatch = useDispatch()

  const getCourseByCategorySlug = async () => {
    try {
      dispatch(changeLoadingState(true))
      const result = await api.getCourseByCate(category, pageSize, pageIndex)
      setCourses(result.data?.result?.data)
      setTotalDoc(result.data?.result?.totalDoc)
      setTotalPage(result.data?.result?.totalPage)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(changeLoadingState(false))
    }
  }

  useEffect(() => {
    getCourseByCategorySlug()
  }, [pageSize, pageIndex, category])

  return (
    <CoursesPageWrapper>
      <div className='container'>
        <div className='category-based-list'>
          {
            courses.map((course) => (
              <Course key={course.id} {...course} />
            ))
          }
        </div>
        <div className='flex flex-center mt-2'>
          <Pagination handlePageChange={setPageIndex} pagesQuantity={totalPage} />
        </div>
      </div>
    </CoursesPageWrapper>
  )
}

const CoursesPageWrapper = styled.div`
  .category-based-list{
    margin-top: 32px;
  }
  @media screen and (min-width: 600px){
    .category-based-list{
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 992px){
    .category-based-list{
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1400px){
    .category-based-list{
      display: grid;
      gap: 26px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default CoursesPage