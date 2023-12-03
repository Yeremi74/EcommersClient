import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch, CiShoppingBasket } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { IoIosHome } from 'react-icons/io'
import './navbar.css'

const Navbar = () => {
  return (
    <div className='container'>
      <div className='bar'>
        <div className='logo'>
          <Link to='/'>ZARA</Link>
        </div>
        <div className='search'>
          <input type='text' />
          <CiSearch />
        </div>
        <div className='icons'>
          <IoPersonOutline />
          <CiShoppingBasket />
        </div>
      </div>
      <div className='mobile_bar'>
        <Link to={'/'}>
          <IoIosHome />
        </Link>
        <CiSearch />
        <IoPersonOutline />
        <CiShoppingBasket />
      </div>
    </div>
  )
}

export default Navbar
