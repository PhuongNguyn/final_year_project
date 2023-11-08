import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { MdInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { RiClosedCaptioningFill } from "react-icons/ri";
import APIService from '../services';
import moment from "moment"
import { formatMoney } from '../utils';
import { useDispatch } from 'react-redux';
import { changeLoadingState } from '../redux/slice/theme.slice';
import { Collapse } from 'react-collapse';
import { AiFillPlayCircle } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react';
import ModalCourse from '../components/ModalCourse/ModalCourse';

const SingleCoursePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams();
  const [course, setCourse] = useState()
  const dispatch = useDispatch()
  const [collapse, setCollapses] = useState([])

  const getCourse = async () => {
    try {
      dispatch(changeLoadingState(true))
      const api = new APIService()
      const result = await api.getCourseBySlug(id)
      setCourse(result.data?.result)
      setCollapses(result.data?.result?.lessons?.map(item => {
        return {
          ...item,
          isOpen: false
        }
      }))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(changeLoadingState(false))
    }
  }

  const setCollapse = (id) => {
    setCollapses(collapse.map(item => {
      if (item.id == id) {
        return {
          ...item,
          isOpen: !item.isOpen
        }
      } else {
        return {
          ...item,
          isOpen: false
        }
      }
    }))
  }

  const handleOpenModal = () => {
    onOpen()
  }

  useEffect(() => {
    getCourse()
  }, []);

  return (
    <SingleCourseWrapper>
      <ModalCourse isOpen={isOpen} onClose={onClose} courses={course?.lessons?.filter(item => item.isFree) || []} />
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
          <div className='course-img-wrapper' onClick={onOpen}>
            <img src={course?.thumbnail} alt={course?.title} />
            {course?.thumbnail && <div className='blur-glass'>
              <div>
                <AiFillPlayCircle size={45} style={{ margin: '0 auto' }} />
                <p className='fs-18 fw-7 mt-2'>Xem trước khoá học này</p>
              </div>
            </div>}
          </div>

        </div>
        <div className='course-details'>
          <div className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'>{course?.category.name}</div>
          <div className='course-head'>
            <h5>{course?.title}</h5>
          </div>
          <div className='course-body'>
            <p className='course-para fs-18'>{course?.description}</p>
            <ul className='course-info'>
              <li>
                <span className='fs-14'>Created by <span className='fw-6 opacity-08'>Admin</span></span>
              </li>
              <li className='flex'>
                <span><MdInfo /></span>
                <span className='fs-14 course-info-txt fw-5'>Last updated {moment(course?.updatedAt).format("DD/MM/YYYY")}</span>
              </li>
              <li className='flex'>
                <span><TbWorld /></span>
                <span className='fs-14 course-info-txt fw-5'>Vi</span>
              </li>
              <li className='flex'>
                <span><RiClosedCaptioningFill /></span>
                <span className='fs-14 course-info-txt fw-5'>Vi [Auto]</span>
              </li>
            </ul>
          </div>

          <div className='course-foot'>
            <div className='course-price'>
              <span className='new-price fs-26 fw-8'>${formatMoney(course?.price)}</span>
              <span className='old-price fs-26 fw-6'>${formatMoney(course?.fakePrice)}</span>
            </div>
          </div>

          <div className='course-btn'>
            <p to={'/#'} className='add-to-cart-btn d-inline-block fw-7 bg-purple'>
              <div className='flex'><FaShoppingCart style={{ verticalAlign: '-2px' }} /> <span style={{ marginLeft: '5px' }}>Add to cart</span></div>
            </p>
          </div>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-learn mx-auto'>
          <div className='course-sc-title'>What you'll learn</div>
          <p>{course?.description}</p>
        </div>

        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Course content</div>
          <ul className='course-content-list'>
            {
              course?.lessons && course?.lessons?.map((contentItem, idx) => {
                return (
                  <>
                    <li key={idx} onClick={() => setCollapse(contentItem.id)}>
                      <span>{contentItem.name}</span>
                      <Collapse isOpened={collapse.find(item => item.id == contentItem.id)?.isOpen}>
                        <p style={{ fontWeight: '500', fontSize: '15px', marginTop: '10px' }}>{contentItem.description}</p>
                      </Collapse>
                    </li>

                  </>
                )
              })
            }
          </ul>
        </div>
      </div>
    </SingleCourseWrapper>
  )
}

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
    }
    .course-para{
      padding: 12px 0;
    }
    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count{
      margin-left: 8px;
    }
    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info{
      li{
        margin-bottom: 2px;
        &:nth-child(2){
          margin-top: 10px;
        }
      }
      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;
      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn{
      margin-top: 16px;
      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details{
        padding-top: 0;
      }
      .course-img{
        padding-top: 15px;
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;
    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        li{
          margin: 5px 0;
          display: flex;
          span{
            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{
        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }

`;

export default SingleCoursePage