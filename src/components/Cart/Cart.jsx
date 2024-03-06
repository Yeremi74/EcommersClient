import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import {
  removeItem,
  resetCart,
  addToCart,
  decrement
} from '../../redux/cartReducer'
import { FaRegTrashAlt } from 'react-icons/fa'
import './cart.css'
import { Link } from 'react-router-dom'



const Cart = ({ cartActive, mobile, setCartActive, setHide }) => {
  
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)
  const [pedido, setPedido] = useState(
    'https://api.whatsapp.com/send?phone=+584243356112'
  )

  const totalPrice = () => {
    let total = 0
    products.forEach(item => (total += item.quantity * item.price))
    return total.toFixed(2)
  }

  const pedidoString = `https://api.whatsapp.com/send?phone=+584243356112&text=Hola Real Eyes!😍, me gustaria *adquirir*🤑 los siguientes productos de su tienda:${products
    ?.map(
      item =>
        `${item.title} con una cantidad de ${item.quantity} en talla: ${item?.sizedCart},`
    )
    .join('')} para un total de ${totalPrice()}`
  return (
    <>
      <div className={`cart ${cartActive ? 'show_aside_cart' : ''}`}>
        <h3>Carrito</h3>
        <span
          className='close'
          onClick={() => {
            setCartActive(false)
            setHide(false)
          }}
        >
          <IoClose />
        </span>
        <div className='item_container'>
          {products?.map(item => (
            <div className='item' key={item.id}>
              <img src={item.img} alt='' />
              <div className='details'>
                <div className='info'>
                  <p className='cart_title'>{item.title}</p>
                  <div className='cart_price'>
                    {/* {item.quantity} x ${item.price} ={' '} */}
                    SUB TOTAL = ${item.quantity * item.price}
                  </div>
                  <span>Talla: {item.sizedCart}</span>
                </div>
                <div className='btnCart'>
                  <button
                    onClick={() =>
                      dispatch(
                        decrement({
                          id: item.id,
                          title: item.title,
                          desc: item.desc,
                          price: item.price,
                          img: item.img,
                          quantity: 1
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          title: item.title,
                          desc: item.desc,
                          price: item.price,
                          img: item.img,
                          quantity: 1
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <span onClick={() => dispatch(removeItem(item.id))}>
                  <FaRegTrashAlt />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='info_result'>
          <div className='total'>
            <span>TOTAL</span>
            <span>${totalPrice()}</span>
          </div>
          <Link
            to={pedido}
            className='checkout'
            onClick={() => {
              setCartActive(false)
              setPedido(pedidoString)
            }}
          >
            FINALIZAR PEDIDO
          </Link>
          {/* <span className='reset' onClick={() => dispatch(resetCart())}>
            Reset Cart
          </span> */}
        </div>
      </div>
    </>
  )
}

export default Cart
