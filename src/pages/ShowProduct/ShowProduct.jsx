import React from 'react'
import AllProducts from '../../components/AllProducts/AllProduct'
import { useParams } from 'react-router-dom'

const ShowProduct = () => {
  const producto = useParams().product
  const url = `https://real-eyes-strapi.onrender.com/api/sub-categories`
  return (
    <div>
      <AllProducts urlShowProduct={'all'} producto={producto} url={url} />
    </div>
  )
}

export default ShowProduct
