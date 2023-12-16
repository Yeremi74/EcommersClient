import React from 'react'
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

const Cart = ({ cartActive, mobile, setCartActive }) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)

  const totalPrice = () => {
    let total = 0
    products.forEach(item => (total += item.quantity * item.price))
    return total.toFixed(2)
  }

  return (
    <>
      <div className={`cart ${cartActive ? 'show_aside_cart' : ''}`}>
        <h3>Carrito</h3>
        <span className='close' onClick={() => setCartActive(false)}>
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
          <button className='checkout'>PROCEED TO CHECKOUT</button>
          <span className='reset' onClick={() => dispatch(resetCart())}>
            Reset Cart
          </span>
        </div>
      </div>
    </>
  )
}

export default Cart
