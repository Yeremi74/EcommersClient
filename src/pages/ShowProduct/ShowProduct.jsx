import React from 'react'
import AllProducts from '../../components/AllProducts/AllProduct'
import { useParams } from 'react-router-dom'

const ShowProduct = () => {
  const producto = useParams().product
  console.log(producto)
  return (
    <div>
      <AllProducts urlShowProduct={'all'} producto={producto} />
    </div>
  )
}

export default ShowProduct
