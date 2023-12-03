import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './catShowProducts.css'
const CatShowProducts = ({ subCats, maxPrice, sort, catId }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let load = await setLoading(true)
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][categories][id]=${catId}${subCats
            .map(item => `&[filters][sub_categories][id][$eq]=${item}`)
            .join('')}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
        )

        load = await setLoading(false)

        const data = await res.json()

        setProducts(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [subCats, sort, maxPrice])

  return (
    <div className='container'>
      {loading ? (
        <div className='loader'>
          <div className='sk-chase'>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
          </div>
        </div>
      ) : products.length == 0 ? (
        <div>NO HAY RESULTADOS, INTENTA CAMBIAR LOS FILTROS</div>
      ) : (
        <div className='product_card_container'>
          {products.map(item => (
            <Card item={item} key={item.id} type='link' />
          ))}
        </div>
      )}
    </div>
  )
}

export default CatShowProducts
