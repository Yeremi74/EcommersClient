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
              {item.attributes.isNew && <div className='isNew'>New Season</div>}
              <img src={`${item.attributes.img.data.attributes.url}`} />
              <p className='title'>{item.attributes.title}</p>
              <p className='price'>${item.attributes.price}</p>
            </Link>
          ) : (
            <Link
              to={`/product/${item.id}`}
              className='card link'
              onClick={() => {
                setMobileSearch(false)
                setHide(false)
              }}
            >
              {item.attributes.isNew && <div className='isNew'>New Season</div>}
              <img src={`${item.attributes.img.data.attributes.url}`} />
              <p className='title'>{item.attributes.title}</p>
              <p className='price'>${item.attributes.price}</p>
            </Link>
          )
        ) : (
          <div className='card'>
            {item.attributes.isNew && <div className='isNew'>New Season</div>}
            <img src={`${item.attributes.img.data.attributes.url}`} />
            <p className='title'>{item.attributes.title}</p>
            <p className='price'>${item.attributes.price}</p>
          </div>
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default Card
