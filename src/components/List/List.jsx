import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './list.css'

const List = ({ type }) => {
  const [products, setProducts] = useState([])
  const [loadMore, setLoadMore] = useState(2)

  const handleLoadMore = () => {
    if (loadMore == 2) {
      setLoadMore(100)
      return
    }

    setLoadMore(2)
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
          <Card item={item} type='link' />
        ))}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  )
}

export default List
