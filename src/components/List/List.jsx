import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './list.css'

const List = ({ type }) => {
  const [products, setProducts] = useState([])
  const [loadMore, setLoadMore] = useState(4)
  const counter = 4
  const handleLoadMore = () => {
    if (loadMore == counter) {
      setLoadMore(12)
      return
    }

    setLoadMore(counter)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][type][$eq]=${type}`
        )
        const data = await res.json()
        setProducts(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='container_section'>
      <h1>{type}</h1>
      <div className='products'>
        {products.slice(0, loadMore).map(item => (
          <Card item={item} type='link' key={item.id} />
        ))}
      </div>
      <button onClick={handleLoadMore}>Ver Más</button>
    </div>
  )
}

export default List
