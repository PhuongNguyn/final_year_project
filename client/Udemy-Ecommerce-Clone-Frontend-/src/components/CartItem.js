import React from 'react';
import styled from "styled-components";
import {FaTrashAlt} from "react-icons/fa";
import { useCartContext } from '../context/cart_context';
import { removeProduct } from '../redux/slice/cart.slice';
import { useDispatch } from 'react-redux';
import { formatMoney } from '../utils';

const CartItem = ({cartItem}) => {

  const dispatch = useDispatch()

  return (
    <CartItemWrapper className='grid'>
      <div className='cart-item-img'>
        <img src = {cartItem.thumbnail} alt = {cartItem.title} />
      </div>
      <div className='cart-item-info'>
        <p className='fw-7 fs-15'>{cartItem.title}</p>
        <span className='cart-item-creator fs-13 opacity-09'>By Admin</span>
        <div className='fw-7 text-purple'>{formatMoney(cartItem.price)}</div>
        <div className='cart-item-category bg-orange fs-12 d-inline-block text-capitalize text-white fw-7'>{cartItem.category?.map(item => item.name).toString()}</div>
        <br />
        <button type = "button" className='remove-btn fs-13 text-dark fw-6 flex' onClick={() => dispatch(removeProduct(cartItem.id))}>Remove <span><FaTrashAlt style={{marginLeft: '2pxx'}}/></span></button>
      </div>
    </CartItemWrapper>
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

export default CartItem