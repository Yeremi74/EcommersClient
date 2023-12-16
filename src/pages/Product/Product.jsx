import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/card/Card'
import './product.css'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartReducer'
import { CartContext } from '../../contexts/CartContext'
const Product = () => {
  const id = useParams().id
  const [data, setData] = useState()
  const [selectedImg, setSelectedImg] = useState(0)
  let [quantity, setQuantity] = useState(1)
  let [sizedCart, setSizedCart] = useState('')
  const [sizeSelected, setsizeSelected] = useState(-1)
  const [mainImage, setMainImage] = useState(null)

  const { setCartActive } = useContext(CartContext)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products/${id}?populate=*`
        )
        const data = await res.json()
        // let sizes = await data.attributes.sizes.data
        setData(data.data)
        // setMainImage()
        setMainImage(data.data.attributes.img.data.attributes.url)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
    setCartActive(false)
  }, [id])

  useEffect(() => {}, [])

  const handleSize = i => {
    if (sizeSelected === i) {
      // return setsizeSelected(null)
    }

    setsizeSelected(i)
  }

  const handleQuantityMore = () => {
    setQuantity(quantity++)
  }
  const handleQuantityLess = () => {}
  return (
    <div className='single_product_container'>
      <div className='images_collection'>
        <div className='column'>
          {data && (
            <img
              src={`${data?.attributes?.img?.data?.attributes?.url}`}
              className='square'
              onClick={() =>
                setMainImage(data?.attributes?.img?.data?.attributes?.url)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.attributes?.img2?.data?.attributes?.url}`}
              className='square'
              onClick={() =>
                setMainImage(data?.attributes?.img2?.data?.attributes?.url)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.attributes?.img3?.data?.attributes?.url}`}
              className='square'
              onClick={() =>
                setMainImage(data?.attributes?.img3?.data?.attributes?.url)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.attributes?.img4?.data?.attributes?.url}`}
              className='square'
              onClick={() =>
                setMainImage(data?.attributes?.img4?.data?.attributes?.url)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.attributes?.img5?.data?.attributes?.url}`}
              className='square'
              onClick={() =>
                setMainImage(data?.attributes?.img5?.data?.attributes?.url)
              }
            />
          )}
        </div>
        <div className='principal'>{data && <img src={mainImage} />}</div>
      </div>
      <div className='info'>
        <h2>{data && data?.attributes?.title}</h2>
        <p className='price'>${data && data?.attributes?.price}</p>

        <div className='quantity'>
          <button
            onClick={() => setQuantity(prev => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
        </div>

        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: data.id,
                title: data.attributes.title,
                desc: data.attributes.desc,
                price: data.attributes.price,
                img: data.attributes.img.data.attributes.url,
                quantity,
                sizedCart
              })
            )
          }
        >
          Añadir al carrito
        </button>

        <p className='desc'>{data && data?.attributes?.desc}</p>
        <div className='sizes'>
          <span>TALLAS:</span>
          <div className='size'>
            {data &&
              data?.attributes?.sizes?.data.map((size, i) => (
                <div
                  key={size.attributes.title}
                  onClick={() => {
                    handleSize(i)
                    setSizedCart(size.attributes.title)
                  }}
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
