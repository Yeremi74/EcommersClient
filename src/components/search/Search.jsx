import React, { useEffect, useState } from 'react'
import './search.css'
import UseFetch from '../../hooks/busqueda'
import { Link } from 'react-router-dom'

const Search = ({ busqueda, max, setIsFocused, isFocused }) => {
  // https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][title][$containsi]=${busqueda}
  const [resultado, setResultado] = useState(false)

  const { data, loading, error } = UseFetch(busqueda)
  // console.log(resultado)

  const handleSearchOther = () => {
    if (mobileSearch) {
      setMobileSearch(false)

      return
    }
  }

  return (
    <div className='containerSearchSearch'>
      {loading ? (
        <div>cargando</div>
      ) : data ? (
        data.slice(0, max).map(item => (
          <Link
            to={`eal-eyes-strapi.onrender.com/product/${item.id}`}
            className='result_buscador'
            onClick={handleSearchOther}
            key={item.id}
          >
            <img src={`${item.attributes.img.data.attributes.url}`} alt='' />
            <div>
              <p>{item.attributes.title}</p>
              <p>${item.attributes.price}</p>
            </div>
          </Link>
        ))
      ) : (
        ''
      )}
    </div>
  )
}

export default Search

// const fetchData = async () => {
//     try {
//       const res = await fetch(
//         `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][title][$containsi]=${busqueda}`
//       )
//       const data = await res.json()
//       setResultado(data.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   fetchData()
