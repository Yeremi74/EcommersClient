import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/card/Card'
import './product.css'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartReducer'
import {tShirt, hoodies, Accesories, Pants,} from '../../products'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const [selectedImg, setSelectedImg] = useState(0)
  let [quantity, setQuantity] = useState(1)
  let [sizedCart, setSizedCart] = useState('')
  const [sizeSelected, setsizeSelected] = useState(-1)
  const [mainImage, setMainImage] = useState(null)

  const notify = () => toast.success('El producto fue añadido al carrito!', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });

  const dispatch = useDispatch()

  useEffect(() => {
    const combinedArray = [...tShirt, ...hoodies, ...Accesories, ...Pants];
    const idNumber = Number(id)
    
    const encontrarObjetoPorId = (id) => {
      return combinedArray.find(objeto => objeto.id === id);
    };

    const objetoEncontrado = encontrarObjetoPorId( idNumber);
    setData(objetoEncontrado)
    setMainImage(data?.img)
  }, [id,data])

  const handleSize = i => {
    if (sizeSelected === i) {
    }

    setsizeSelected(i)
  }

  return (
    <div className='single_product_container'>
      <div className='images_collection'>
        <div className='column'>
          {data && (
            <img
              src={`${data?.img}`}
              className='square'
              onClick={() =>
                setMainImage(data?.img)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.img2}`}
              className='square'
              onClick={() =>
                setMainImage(data?.img2)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.img3}`}
              className='square'
              onClick={() =>
                setMainImage(data?.img3)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.img4}`}
              className='square'
              onClick={() =>
                setMainImage(data?.img4)
              }
            />
          )}
          {data && (
            <img
              src={`${data?.img5}`}
              className='square'
              onClick={() =>
                setMainImage(data?.img5)
              }
            />
          )}
        </div>
        <div className='principal'>{data && <img src={mainImage} />}</div>
      </div>
      <div className='info'>
        <h2>{data && data?.title}</h2>
        <p className='price'>${data && data?.price}</p>

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
            {dispatch(
              addToCart({
                id: data.id,
                title: data.title,
                desc: data.desc,
                price: data.price,
                img: data.img,
                quantity,
                sizedCart
              })
            ); notify()}
          }
        >
          Añadir al carrito
        </button>
        <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
        <p className='desc'>Description {data?.title}</p>
        <div className='sizes'>
          <span>TALLAS:</span>
          <div className='size'>
            {data &&
              data?.size?.map((size, i) => (
                <div
                  key={size}
                  onClick={() => {
                    handleSize(i)
                    setSizedCart(size)
                  }}
                  className={`${sizeSelected == i ? 'size_active' : ''} number`}
                >
                  <span>{size.toUpperCase()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
