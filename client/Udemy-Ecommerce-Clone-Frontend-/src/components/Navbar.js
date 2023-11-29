import React from 'react';
import styled from "styled-components";
import { MdMenu, MdShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSidebarContext } from '../context/sidebar_context';
import { useCartContext } from '../context/cart_context';
import { Avatar } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_AVATAR } from '../utils/constants';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { logout } from '../redux/slice/user.slice';

const Navbar = () => {
  const { total_items } = useCartContext();
  const { openSidebar } = useSidebarContext();
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.persistedReducer)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <NavbarWrapper className="bg-white flex">
      <div className='container w-100'>
        <div className='brand-and-toggler flex flex-between w-100'>
          <Link to="/" className='navbar-brand text-uppercase ls-1 fw-8'>
            <span>c</span>oursean
          </Link>

          <div className='navbar-btns flex gap-2'>
            <Link to="/cart" className='cart-btn'>
              <MdShoppingCart />
              <span className='item-count-badge'>{cart?.products?.length || 0}</span>
            </Link>
            {!user && <Link to={'/login'}><div className='button-login border-thin-solid-black text-black fw-6 fs-14'>
              Đăng nhập
            </div></Link>}
            {!user && <Link to={'/sign-up'}><div className='button-sign-up border-thin-solid-black text-white fw-6 fs-14'>
              Đăng kí
            </div></Link>}
            {user && <Menu><MenuButton fontSize={'12px'}><Avatar src={user.avatar || DEFAULT_AVATAR} /></MenuButton><MenuList zIndex={10}>
              <MenuItem><Link to={'/user-profile'} style={{ fontSize: '15px', cursor: 'pointer' }}>My Learning</Link></MenuItem>
              <MenuItem style={{ fontSize: '15px', cursor: 'pointer' }} onClick={handleLogout}>Log out</MenuItem>
            </MenuList></Menu>}
            <button type="button" className='sidebar-open-btn' onClick={() => openSidebar()}>
              <MdMenu />
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper >
  )
}

const NavbarWrapper = styled.nav`
  height: 80px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px, rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

  .navbar-brand{
    font-size: 23px;
    span{
      color: var(--clr-orange);
    }
  }
  .cart-btn{
    margin-right: 18px;
    font-size: 23px;
    position: relative;
    display: flex;
    align-items:center;
    .item-count-badge{
      background-color: var(--clr-orange);
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 12px;
      font-weight: 700;
      display: block;
      width: 23px;
      height: 23px;
      color: var(--clr-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .sidebar-open-btn{
    display: flex;
    align-items:center;
    transition: all 300ms ease-in-out;
    &:hover{
      opacity: 0.7;
    }
  }
`;

export default Navbar;