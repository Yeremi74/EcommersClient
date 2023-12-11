import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'

const Card = ({ item, type = 'normal', mobile }) => {
  return (
    <div>
      {item ? (
        type === 'link' ? (
          mobile === true ? (
            <Link to={`/product/${item.id}`} className='card link desk'>
              {item.attributes.isNew && <div className='isNew'>New Season</div>}
              <img src={`${item.attributes.img.data.attributes.url}`} />
              <p className='title'>{item.attributes.title}</p>
              <p className='price'>${item.attributes.price}</p>
            </Link>
          ) : (
            <Link to={`/product/${item.id}`} className='card link'>
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
