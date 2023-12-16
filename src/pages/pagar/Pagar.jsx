import React from 'react'
import './Pagar.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Pagar = () => {
  const products = useSelector(state => state.cart.products)
  return (
    <div className='pay_container'>
      <Link
        to={`https://api.whatsapp.com/send?phone=+584243356112&text=Hola Real Eyes!, me gustaria compras los siguientes productos de su tienda: ${products
          ?.map(
            item =>
              `${item.title} con una cantidad de ${item.quantity} en talla: ${item?.sizedCart}.`
          )
          .join('')}`}
      >
        Hola
      </Link>
    </div>
  )
}

export default Pagar
