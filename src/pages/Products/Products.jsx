import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CatShowProducts from '../../components/ShowProducts/CatShowProducts'
import { IoIosMenu, IoIosArrowDown } from 'react-icons/io'
import './products.css'

const Products = () => {
  const catId = parseInt(useParams().id)
  const sex = useParams().sex
  const [maxPrice, setMaxPrice] = useState(500)
  const [sort, setSort] = useState('desc')
  const [selectedSubCats, setSelectedSubCats] = useState([])
  const [products, setProducts] = useState([])
  const [activeBar, setActiveBar] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/sub-categories?[filters][categories][id][$eq]=${catId}`
        )
        const data = await res.json()
        setProducts(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const handleChange = e => {
    const value = e.target.value
    const isChecked = e.target.checked

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter(item => item !== value)
    )
  }

  const toggle = i => {
    if (selected === i) {
      return setSelected(null)
    }

    setSelected(i)
  }

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
        <div className={`${activeBar ? 'aside_bar_active' : ''} aside_bar`}>
          <div className='filterItem'>
            <div
              className={selected == 1 ? `titleCat show` : `titleCat`}
              onClick={() => toggle(1)}
            >
              <span>TIPO DE ROPA</span> <IoIosArrowDown />
            </div>
            <div className={selected == 1 ? `content show` : `content`}>
              {products.map(item => (
                <div key={item.id} className='typeoff'>
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                  <input
                    type='checkbox'
                    id={item.id}
                    value={item.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='filterItem'>
            <div
              className={selected == 2 ? `titleCat show` : `titleCat`}
              onClick={() => toggle(2)}
            >
              <span>Filter by price</span> <IoIosArrowDown />
            </div>
            <div className={selected == 2 ? `content show` : `content`}>
              <span>0</span>
              <input
                type='range'
                min={0}
                max={500}
                onChange={e => setMaxPrice(e.target.value)}
              />
              <span>{maxPrice}</span>
            </div>
          </div>

          <div className='filterItem'>
            <div
              className={selected == 3 ? `titleCat show` : `titleCat`}
              onClick={() => toggle(3)}
            >
              <span>Sort by</span> <IoIosArrowDown />
            </div>
            <div
              className={`${
                selected == 3 ? `content show` : `content`
              } inputFilter`}
            >
              <div>
                <input
                  type='radio'
                  id='asc'
                  value='asc'
                  name='price'
                  onChange={e => setSort('asc')}
                />
                <label htmlFor='asc'>Price (Lowest first)</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='desc'
                  value='desc'
                  name='price'
                  onChange={e => setSort('desc')}
                />
                <label htmlFor='desc'>Price (Highest first)</label>
              </div>
            </div>
          </div>
        </div>
        <CatShowProducts
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  )
}

export default Products
