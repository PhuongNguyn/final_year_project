import React, { useEffect, useState } from 'react';
import { useCartContext } from '../context/cart_context';
import styled from "styled-components";
import CartItem from "../components/CartItem";
import {MdClear} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import Confirm from '../components/Confirm';
import { clearCart } from '../redux/slice/cart.slice';
import { formatMoney } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import APIService from '../services';
import { useToast } from '@chakra-ui/react';

const CartPage = () => {
  const cart = useSelector(state => state.persistedReducer);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const dispath = useDispatch()
  const user = useSelector((state) => state.users)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(()=>{
    let total = 0 
    cart.products?.forEach(item => total+=item.price)
    setTotalPrice(total)
  },[cart?.products])

  if(cart.products?.length < 1){
    return (
      <NotFoundWrapper>
        <div className='container'>No items found in the cart.</div>
      </NotFoundWrapper>
    )
  }

  const handleMomoPay = async () => {
    try {
      const api = new APIService()
      const result = await api.momoPay({products: cart?.products, total: totalPrice})
      if(result?.data?.resultCode == 0){
        window.open(result.data?.payUrl, "_blank")
        return;
      }
      toast({status: "error", title: "Có lỗi trong quá trình thanh toán"})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CartWrapper>
      <Confirm onConfirm = {()=>dispath(clearCart())} isOpen={isOpenConfirm} onClose={()=>setIsOpenConfirm(false)} title={"Xoá giỏ hàng"} description={"Bạn có muốn xoá toàn bộ giỏ hàng"}/>
      <div className='container'>
        <div className='cart-pg-title'>
          <h3>Shopping Cart</h3>
        </div>
        <div className='cart-grid grid'>
          {/* card grid left */}
          <div className='cart-grid-left'>
            <div className='flex flex-wrap flex-between'>
              <div className='cart-count-info'>
                <span className='fw-7 fs-18'>{cart.products?.length || 0}</span> Course in Cart
              </div>
              <button type = "button" className='cart-clear-btn flex fs-15 fw-6 text' onClick={() => clearCart()}>
                <MdClear className='text-pink' />
                <span className='d-inline-block text-pink' onClick={()=>setIsOpenConfirm(true)}>Clear All</span>
              </button>
            </div>

            <div className='cart-items-list grid'>
              {
                cart.products.map(cartItem => {
                  return (
                    <CartItem key = {cartItem.id} cartItem = {cartItem} />
                  )
                })
              }
            </div>
          </div>
          {/* end of grid left */}
          {/* cart grid right */}
          <div className='cart-grid-right'>
            <div className='cart-total'>
              <span className='d-block fs-18 fw-6'>Total:</span>
              <div className='cart-total-value fw-8'>{formatMoney(totalPrice)}</div>
              {user?.user ? <button type = "button" className='checkout-btn bg-purple text-white fw-6' onClick={()=>handleMomoPay()}>Thanh toán</button> : <p className='mt-2 text-18'><Link to={`/login?from=cart`}>Đăng nhập</Link> để thanh toán</p>}
            </div>
          </div>
          {/* end of cart grid right */}
        </div>
      </div>
    </CartWrapper>
  )
}

const NotFoundWrapper = styled.div`
  padding: 30px 0;
  font-weight: 600;
`;

const CartWrapper = styled.div`
  padding: 30px 0;
  .card-pg-title{
    padding: 20px 0 6px 0;
  }
  .cart-grid{
    row-gap: 40px;
    .cart-grid-left{
      margin-bottom: 30px;
    }

    .cart-clear-btn{
      span{
        margin-left: 6px;
      }
    }

    .cart-items-list{
      margin-top: 20px;
      row-gap: 12px;
    }
    .cart-total-value{
      font-size: 34px;
    }
    .checkout-btn{
      padding: 14px 28px;
      letter-spacing: 1px;
      margin-top: 12px;
      transition: var(--transition);

      &:hover{
        background-color: var(--clr-dark);
      }
    }
    .cart-total{
      padding-bottom: 50px;
    }

    @media screen and (min-width: 992px){
      grid-template-columns: 70% 30%;;
      column-gap: 32px;
    }
  }
`;

export default CartPage
