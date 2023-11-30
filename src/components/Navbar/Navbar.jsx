import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch, CiShoppingBasket } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import './navbar.css'

const Navbar = () => {
  return (
    <div className='container'>
      <div className='bar'>
        <div className='logo'>
          <Link to='/'>ZARA</Link>
        </div>
        <div className='links'>
          <Link>Catalog</Link>
          <Link>About</Link>
          <Link>Help</Link>
        </div>
        <div className='icons'>
          <CiSearch />
          <IoPersonOutline />
          <CiShoppingBasket />
        </div>
      </div>
    </div>
  )
}

export default Navbar
