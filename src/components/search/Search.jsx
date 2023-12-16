import React, { useEffect, useState } from 'react'
import './search.css'
import UseFetch from '../../hooks/busqueda'
import { Link } from 'react-router-dom'
import Card from '../card/Card'
import Loader from '../loader/Loader'

const Search = ({
  busqueda,
  max,
  setIsFocused,
  isFocused,
  mobile,
  setMobileSearch,
  setHide
}) => {
  // https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][title][$containsi]=${busqueda}
  const [resultado, setResultado] = useState(false)

  const { data, loading, error } = UseFetch(busqueda)

  const handleSearchOther = () => {
    if (mobileSearch) {
      setMobileSearch(false)

      return
    }
  }

  return (
    <div
      className={`containerSearchSearch ${
        mobile == true ? 'container_desk' : 'container_mobile'
      }
      ${loading ? 'loading_data' : ''}`}
    >
      {loading ? (
        <Loader />
      ) : data.length >= 1 ? (
        data.slice(0, max).map(item => (
          <Card
            item={item}
            key={item.id}
            type='link'
            mobile={mobile}
            setMobileSearch={setMobileSearch}
            setHide={setHide}
          />
          // <Link
          //   to={`/product/${item.id}`}
          //   className='result_buscador'
          //   onClick={handleSearchOther}
          //   key={item.id}
          // >
          //   <img src={`${item.attributes.img.data.attributes.url}`} alt='' />
          //   <div>
          //     <p>{item.attributes.title}</p>
          //     <p>${item.attributes.price}</p>
          //   </div>
          // </Link>
        ))
      ) : (
        <span className='span'>no hay resultados</span>
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
