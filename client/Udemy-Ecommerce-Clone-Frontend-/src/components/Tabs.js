import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Course from "./Course";
import { PYTHON, WEB_DEVELOPMENT, DATA_SCIENCE, AWS, DESIGN, MARKETING } from "../utils/constants";
import courses from '../utils/data';
import APIService from '../services';
import { useDispatch } from 'react-redux';
import { changeLoadingState } from '../redux/slice/theme.slice';

const Tabs = ({ categories }) => {
  const [activeTab, setActiveTab] = useState(categories?.[0]?.id || "");
  const [courses, setCourses] = useState([])
  const tabHandler = (category) => {
    setActiveTab(category);
  }

  const dispatch = useDispatch()

  const getNewestCourseByCate = async () => {
    try {
      dispatch(changeLoadingState(true))
      console.log(categories?.find(item => item.id == activeTab))
      const api = new APIService()
      const reuslt = await api.getCourseByCate(categories?.find(item => item.id == activeTab)?.slug)
      setCourses(reuslt.data?.result?.data)

    } catch (error) {
      console.log(error)
    } finally {
      dispatch(changeLoadingState(false))
    }
  }

  useEffect(() => {
    setActiveTab(categories?.[0]?.id)
  }, [categories])

  useEffect(() => {
    getNewestCourseByCate()
  }, [activeTab])

  return (
    <TabsWrapper>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          {categories?.map(category => <li className='tabs-head-item'>
            <button type="button" className={`tab-btn ${activeTab === category.id ? "tab-btn-active" : ""}`} onClick={() => tabHandler(category.id)}>{category.name}</button>
          </li>)}
        </ul>

        <div className='tabs-body'>
          {
            courses?.map((course) => (
              <Course key={course.id} {...course} />
            ))
          }
        </div>
      </div>
    </TabsWrapper>

  )
}

const TabsWrapper = styled.div`
  .tabs{
    margin-top: 16px;
    .tabs-head-item button{
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover{
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body{
      margin-top: 32px;
    }

    @media screen and (min-width: 600px){
      .tabs-body{
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs