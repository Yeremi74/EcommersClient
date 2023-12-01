import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './catShowProducts.css'
const CatShowProducts = ({ subCats, maxPrice, sort, catId }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][categories][id]=${catId}${subCats
            .map(item => `&[filters][sub_categories][id][$eq]=${item}`)
            .join('')}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
        )
        {
          /* si hay muchos productos, haciendo este metodo hara que sea lento traer los productos, asi que el filtrado de precios es mejos que se haga el fetch con un boton */
        }
        const data = await res.json()

        setProducts(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [subCats, sort, maxPrice])
  console.log(subCats)
  console.log(
    `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      item => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  )
  return (
    <div className='product_card_container'>
      {products.map(item => (
        <Card item={item} key={item.id} type='link' />
      ))}
      <div className='hola'>
        {/* {`https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][categories][id]=${catId}${subCats
          .map(item => `&[filters][sub_categories][id][$eq]=${item}`)
          .join('')}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`} */}
      </div>
    </div>
  )
}

export default CatShowProducts
