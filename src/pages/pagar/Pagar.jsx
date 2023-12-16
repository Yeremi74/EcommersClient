import React, { useState } from 'react'
import './Pagar.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Pagar = () => {
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
    <div className='pay_container'>
      <Link to={pedido} onClick={() => setPedido(pedidoString)}>
        Finalizar pedido
      </Link>
    </div>
  )
}

export default Pagar
