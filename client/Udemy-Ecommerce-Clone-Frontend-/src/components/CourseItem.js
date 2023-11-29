import React from 'react';
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { removeProduct } from '../redux/slice/cart.slice';
import { useDispatch } from 'react-redux';
import { formatMoney } from '../utils';
import { Link } from 'react-router-dom';

const CourseItem = ({ course }) => {

    return (
        <Link to={`/courses/${course?.slug}`}>
            <CartItemWrapper className='grid'>

                <div className='cart-item-img'>
                    <img src={course?.thumbnail} alt={course?.title} />
                </div>
                <div className='cart-item-info'>
                    <p className='fw-7 fs-15'>{course?.title}</p>
                    <span className='cart-item-creator fs-13 opacity-09'>By Admin</span>
                    <br/>
                    <div className='cart-item-category bg-orange fs-12 d-inline-block text-capitalize text-white fw-7'>{course.category?.map(item => item.name).toString()}</div>
                </div>
            </CartItemWrapper>

        </Link>
    )
}

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .cart-item-img{
    width: 100px;
    height: 100px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cart-item-category{
    padding: 0px 10px;
    border-radius: 6px;
  }
  .remove-btn{
    margin-top: 16px;
    transition: var(--transition);
    &:hover{
      color: var(--clr-purple);
    }
  }
`;

export default CourseItem