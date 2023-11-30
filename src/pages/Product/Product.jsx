import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/card/Card'

const Product = () => {
  const id = useParams().id
  const [data, setData] = useState()
  const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products/${id}?populate=*`
        )
        const data = await res.json()
        setData(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      hola
      {/* {data &&  />} */}
      <Card item={data} type='normal' />
    </div>
  )
}

export default Product
