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


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Cart = ({ cartActive, mobile, setCartActive, setHide }) => {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleClose2 = () => {
    setOpen(false);
    dispatch(removeItem(info.id))
  };
  

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
                <span onClick={() => {
                  handleClickOpen()
                  setInfo(item)
                }}>
                {/* dispatch(removeItem(item.id)) */}
                  <FaRegTrashAlt />
                </span>
                <React.Fragment>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Eliminar producto?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Quieres eliminar el producto {info.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose2}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
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
