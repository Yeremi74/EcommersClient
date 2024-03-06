import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'

const Card = ({ item, type = 'normal', mobile, setMobileSearch, setHide }) => {
  
  return (
    <div className='card_c'>
      {item ? (
        type === 'link' ? (
          mobile === true ? (
            <Link
              to={`/product/${item.id}`}
              className='card link desk'
              onClick={() => {
                setMobileSearch(false)
                setHide(false)
              }}
            >
              {item.isNew && (
                <div className='isNew'>New Season</div>
              )}
              <img src={`https://real-eyes-ecommerces.netlify.app${item?.img}`} />
              <p className='title'>{item?.title}</p>
              <p className='price'>${item?.price}</p>
            </Link>
          ) : (
            <Link
              to={`/product/${item?.id}`}
              className='card link'
              onClick={() => {
                setMobileSearch(false)
                setHide(false)
              }}
            >
              {item?.isNew && (
                <div className='isNew'>New Season</div>
              )}
              <img src={`https://real-eyes-ecommerces.netlify.app${item?.img}`} />
              <p className='title'>{item?.title}</p>
              <p className='price'>${item?.price}</p>
            </Link>
          )
        ) : (
          <div className='card'>
            {item?.isNew && <div className='isNew'>New Season</div>}
            <img src={`https://real-eyes-ecommerces.netlify.app${item?.img}`} />
            <p className='title'>{item?.title}</p>
            <p className='price'>${item?.price}</p>
          </div>
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default Card
