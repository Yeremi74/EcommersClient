import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './catShowProducts.css'
const CatShowProducts = ({
  subCats,
  maxPrice,
  sort,
  catId,
  urlShowProduct,
  producto = ''
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let load = await setLoading(true)
        if (urlShowProduct === 'gender') {
          const res = await fetch(
            `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][categories][id]=${catId}${subCats
              .map(item => `&[filters][sub_categories][id][$eq]=${item}`)
              .join(
                ''
              )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}&pagination[page]=1&pagination[pageSize]=100`
          )
          load = await setLoading(false)

          const data = await res.json()
          setProducts(data.data)
        } else if (urlShowProduct === 'all') {
          const res = await fetch(
            `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][title][$containsi]=${producto}${subCats
              .map(item => `&[filters][sub_categories][id][$eq]=${item}`)
              .join(
                ''
              )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}&pagination[page]=1&pagination[pageSize]=100`
          )
          load = await setLoading(false)

          const data = await res.json()
          setProducts(data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [subCats, sort, maxPrice, producto])

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
        <div>
          {/* {products.length} */}
          <br />
          {/* {`https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][title][$containsi]=${producto}${subCats
            .map(item => `&[filters][sub_categories][id][$eq]=${item}`)
            .join(
              ''
            )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}&pagination[page]=1&pagination[pageSize]=100`} */}
          <div className='product_card_container'>
            {products.map(item => (
              <Card item={item} key={item.id} type='link' />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CatShowProducts
