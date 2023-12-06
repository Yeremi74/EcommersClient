import React from 'react'
import AllProducts from '../../components/AllProducts/AllProduct.jsx'
import { useParams } from 'react-router-dom'
const Products = () => {
  const catId = parseInt(useParams().id)
  const sex = useParams().sex
  const url = `https://real-eyes-strapi.onrender.com/api/sub-categories?[filters][categories][id][$eq]=${catId}`

  return (
    <div>
      <AllProducts
        catId={catId}
        sex={sex}
        url={url}
        urlShowProduct={'gender'}
      />
    </div>
  )
}

export default Products
