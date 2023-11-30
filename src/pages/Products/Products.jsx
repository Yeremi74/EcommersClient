import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CatShowProducts from '../../components/ShowProducts/CatShowProducts'
import './products.css'

const Products = () => {
  const catId = parseInt(useParams().id)
  const sex = useParams().sex
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState('desc')
  const [selectedSubCats, setSelectedSubCats] = useState([])
  const [products, setProducts] = useState([])

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

  return (
    <div className='products_container'>
      <div className='aside_bar'>
        Categoria de: {sex}
        {products.map(item => (
          <div key={item.id}>
            <input
              type='checkbox'
              id={item.id}
              value={item.id}
              onChange={handleChange}
            />
            <label htmlFor={item.id}>{item.attributes.title}</label>
          </div>
        ))}
        <div className='filterItem'>
          <h2>Filter by price</h2>
          <div className='inputItem'>
            <span>0</span>
            <input
              type='range'
              min={0}
              max={1000}
              onChange={e => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className='filterItem'>
          <h2>Sort by</h2>
          <div className='inputItem'>
            <input
              type='radio'
              id='asc'
              value='asc'
              name='price'
              onChange={e => setSort('asc')}
            />
            <label htmlFor='asc'>Price (Lowest first)</label>
          </div>
          <div className='inputItem'>
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
      <CatShowProducts
        catId={catId}
        maxPrice={maxPrice}
        sort={sort}
        subCats={selectedSubCats}
      />
    </div>
  )
}

export default Products
