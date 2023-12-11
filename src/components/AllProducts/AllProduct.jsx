import React, { useEffect, useState } from 'react'
import CatShowProducts from '../../components/ShowProducts/CatShowProducts'
import { IoIosMenu, IoIosArrowDown } from 'react-icons/io'
import './AllProduct.css'
import Filter from '../filter/Filter'

const AllProducts = ({
  catId = 0,
  url = null,
  urlShowProduct,
  producto = ''
}) => {
  const [maxPrice, setMaxPrice] = useState(500)
  const [sort, setSort] = useState('desc')
  const [selectedSubCats, setSelectedSubCats] = useState([])
  const [products, setProducts] = useState([])
  const [activeBar, setActiveBar] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const handleAsideBar = () => {
    if (activeBar) {
      setActiveBar(false)
      return
    }
    setActiveBar(true)
  }

  return (
    <div
      className={`${activeBar ? 'container_active ' : ''} products_container`}
    >
      <div
        className={`${activeBar ? 'bg_active bg' : 'bg'}`}
        onClick={handleAsideBar}
      ></div>

      <span className='filter' onClick={handleAsideBar}>
        <IoIosMenu />
        FILTRAR
      </span>
      <div className='content_container'>
        <Filter
          activeBar={activeBar}
          products={products}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          setProducts={setProducts}
          setSelectedSubCats={setSelectedSubCats}
          selectedSubCats={selectedSubCats}
          setSort={setSort}
        />
        <CatShowProducts
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
          urlShowProduct={urlShowProduct}
          producto={producto}
        />
      </div>
    </div>
  )
}

export default AllProducts
