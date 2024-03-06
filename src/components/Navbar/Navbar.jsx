import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoCartOutline, IoCartSharp } from 'react-icons/io5'
import { IoMdSearch } from 'react-icons/io'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import './navbar.css'
import Search from '../search/Search'
import { useSelector } from 'react-redux'
import Cart from '../Cart/Cart'

const Navbar = ({ hide, setHide }) => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [cartActive, setCartActive] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef()
  const location = useLocation()
  const products = useSelector(state => state.cart.products)

  // setMobileSearch(false)
  //   setHide(false)
  useEffect(() => {
    const handlePopState = event => {
      setCartActive(false)
    }

    window.addEventListener('popstate', handlePopState)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
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
      setMobileSearch(false)
      setHide(false)
      return
    }
    setCartActive(true)
  }

  return (
    <div className='container'>
      <div className='bar'>
        <div className='logo'>
          <Link to='/' onClick={() => {
            setMobileSearch(setMobileSearch)
            setHide(setHide)
            setSearchValue('')
          }}>REAL EYES</Link>
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
              <IoMdSearch onFocus={() => setIsFocused(true)} />
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
          {cartActive && (
            <div className='bg_cart_active' onClick={handleActiveCart}></div>
          )}
          <div className='cartIcon' onClick={handleActiveCart}>
            {!cartActive ? <IoCartOutline /> : <IoCartSharp />}
            <p className='quantity_bg'>{products.length}</p>
            <Cart
              cartActive={cartActive}
              setCartActive={setCartActive}
              setHide={setHide}
            />
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
              <IoMdSearch onBlur={() => setIsFocused(false)} />
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
        <Link to={'/'} onClick={handleSearchOther}>
          {location.pathname === '/' ? <AiFillHome /> : <AiOutlineHome />}
          <span>Inicio</span>
        </Link>
        <span onClick={handleSearch}>
          <IoMdSearch />
          <span>Buscar</span>
        </span>
        <span className='cartIcon' onClick={handleActiveCart}>
          {!cartActive ? <IoCartOutline /> : <IoCartSharp />}
          <p className='quantity_bg'>{products.length}</p>
          <span>Carrito</span>
        </span>
      </div>
      {/* {cartActive && <Cart cartActive={cartActive} />} */}
      <Cart
        cartActive={cartActive}
        setCartActive={setCartActive}
        setHide={setHide}
      />
    </div>
  )
}

export default Navbar
