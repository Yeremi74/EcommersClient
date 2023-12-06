import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch, CiShoppingBasket } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { IoIosHome } from 'react-icons/io'
import './navbar.css'
import Search from '../search/Search'
import UseFetch from '../../hooks/busqueda'

const Navbar = ({ hide, setHide }) => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef()

  const handleSearchOther = () => {
    if (mobileSearch) {
      setMobileSearch(false)
      setHide(false)
      return
    }
  }
  const handleSearch = () => {
    if (mobileSearch) {
      setMobileSearch(false)
      setHide(false)
      return
    }

    setHide(true)
    setMobileSearch(true)
  }

  const handleKeyDownBtn = () => {
    if (searchValue) {
      console.log('navegando')
      navigate(`/showAllProduct/${searchValue}`)
      // inputRef.current.blur()
      setMobileSearch(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (!searchValue) {
        return
      }
      navigate(`/showAllProduct/${searchValue}`)
      inputRef.current.blur()
      setMobileSearch(false)
    }
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
                max={5}
                setIsFocused={setIsFocused}
                isFocused={isFocused}
              />
              {/* {searchValue} */}
            </div>
          </div>
        </div>
        <div className='icons'>
          <IoPersonOutline />
          <CiShoppingBasket />
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
                max={10}
                setIsFocused={setIsFocused}
                isFocused={isFocused}
              />
              {/* {searchValue} */}
            </div>
          </div>
        </div>
      </div>
      <div className='mobile_bar'>
        <Link to={'/'}>
          <IoIosHome onClick={handleSearchOther} />
        </Link>
        <CiSearch onClick={handleSearch} />
        <IoPersonOutline onClick={handleSearchOther} />
        <CiShoppingBasket onClick={handleSearchOther} />
      </div>
    </div>
  )
}

export default Navbar
