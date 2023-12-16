import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch, CiShoppingBasket } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { IoIosHome } from 'react-icons/io'
import './navbar.css'
import Search from '../search/Search'
import UseFetch from '../../hooks/busqueda'
import { useSelector } from 'react-redux'
import Cart from '../Cart/Cart'

const Navbar = ({
  hide,
  setHide,
  setMobileSearch,
  mobileSearch,
  cartActive,
  setCartActive
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const navigate = useNavigate()
  const inputRef = useRef()

  const products = useSelector(state => state.cart.products)

  useEffect(() => {
    setMobileSearch(false)
    setHide(false)
    setCartActive(false)
  }, [])

  const handleSearchOther = () => {
    if (mobileSearch) {
      setMobileSearch(false)
      setHide(false)
      return
    }
    setHide(false)
    setCartActive(false)
  }
  const handleSearch = () => {
    if (mobileSearch) {
      setMobileSearch(false)
      setHide(false)
      return
    }
    setCartActive(false)
    setHide(true)
    setMobileSearch(true)
  }

  const handleKeyDownBtn = () => {
    if (searchValue === '') {
      navigate(`/catalogo/*`)
      setHide(false)
      setMobileSearch(false)
      return
    }
    navigate(`/catalogo/${searchValue}`)
    // inputRef.current.blur()
    setHide(false)
    setMobileSearch(false)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (searchValue === '') {
        navigate(`/catalogo/*`)
        setMobileSearch(false)
        inputRef.current.blur()
        setHide(false)
        return
      }
      navigate(`/catalogo/${searchValue}`)
      inputRef.current.blur()
      setMobileSearch(false)
      setHide(false)
    }
  }

  const handleActiveCart = () => {
    if (cartActive) {
      setCartActive(false)
      setHide(false)
      return
    }
    setCartActive(true)
    setHide(true)
  }

  return (
    <div className='container'>
      <div className='bar'>
        <div className='logo'>
          <Link to='/'>ZARA</Link>
        </div>
        <div className='search_container'>
          <div className='search'>
            <input
              ref={inputRef}
              type='text'
              value={searchValue}
              onInput={e => {
                setSearchValue(e.target.value)
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            <div onClick={handleKeyDownBtn} className='btn_search'>
              <CiSearch onFocus={() => setIsFocused(true)} />
            </div>
          </div>
          <div
            className='result_container'
            style={{ display: isFocused || isHovering ? 'block' : 'none' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className='results'>
              <Search
                busqueda={searchValue}
                max={15}
                setIsFocused={setIsFocused}
                isFocused={isFocused}
                mobile={true}
                setMobileSearch={setMobileSearch}
                setHide={setHide}
              />
              {/* {searchValue} */}
            </div>
          </div>
        </div>
        <div className='icons'>
          <IoPersonOutline />
          {hide && (
            <div className='bg_cart_active' onClick={handleActiveCart}></div>
          )}
          <div className='cartIcon' onClick={handleActiveCart}>
            <CiShoppingBasket />
            <p className='quantity_bg'>{products.length}</p>
            <Cart cartActive={cartActive} />
          </div>
        </div>
      </div>

      <div
        className={
          mobileSearch ? 'mobile__search__true mobile_search' : 'mobile_search'
        }
      >
        <div>
          <div className='search'>
            <input
              ref={inputRef}
              type='text'
              value={searchValue}
              onInput={e => {
                setSearchValue(e.target.value)
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            <div className='btn_search' onClick={handleKeyDownBtn}>
              <CiSearch onBlur={() => setIsFocused(false)} />
            </div>
          </div>
          <div
            className='result_container'
            style={{ display: isFocused || isHovering ? 'block' : 'none' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className='results'>
              <Search
                busqueda={searchValue}
                max={20}
                setIsFocused={setIsFocused}
                isFocused={isFocused}
                mobile={false}
                setMobileSearch={setMobileSearch}
                setHide={setHide}
              />
              {/* {searchValue} */}
            </div>
          </div>
        </div>
      </div>
      <div className='mobile_bar'>
        <Link to={'/'}>
          <IoIosHome onClick={handleSearchOther} />
          <span>Inicio</span>
        </Link>
        <span>
          <CiSearch onClick={handleSearch} />
          <span>Buscar</span>
        </span>
        <span>
          <IoPersonOutline onClick={handleSearchOther} />
          <span>Perfil</span>
        </span>
        <span className='cartIcon' onClick={handleActiveCart}>
          <CiShoppingBasket />
          <p className='quantity_bg'>{products.length}</p>
          <span>Carrito</span>
        </span>
      </div>
      {/* {cartActive && <Cart cartActive={cartActive} />} */}
      <Cart cartActive={cartActive} />
    </div>
  )
}

export default Navbar
