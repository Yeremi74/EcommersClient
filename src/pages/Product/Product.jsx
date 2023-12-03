import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/card/Card'
import './product.css'
const Product = () => {
  const id = useParams().id
  const [data, setData] = useState()
  const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [sizeSelected, setsizeSelected] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products/${id}?populate=*`
        )
        const data = await res.json()
        // let sizes = await data.attributes.sizes.data
        setData(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const handleSize = i => {
    if (sizeSelected === i) {
      // return setsizeSelected(null)
    }

    setsizeSelected(i)
  }

  // console.log(data.attributes.sizes.data[1].attributes.title)
  return (
    <div className='single_product_container'>
      <div className='images_collection'>
        <div className='column'>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
        </div>
        <div className='principal'>
          {data && <img src={`${data.attributes.img.data.attributes.url}`} />}
        </div>
      </div>
      <div className='info'>
        <h2>{data && data.attributes.title}</h2>
        <p className='price'>${data && data.attributes.price}</p>

        <button>Añadir al carrito</button>

        <p className='desc'>{data && data.attributes.desc}</p>
        <div className='sizes'>
          <span>TALLAS:</span>
          <div className='size'>
            {data &&
              data.attributes.sizes.data.map((size, i) => (
                <div
                  key={size.attributes.title}
                  onClick={() => handleSize(i)}
                  className={`${sizeSelected == i ? 'size_active' : ''} number`}
                >
                  <span>{size.attributes.title}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
