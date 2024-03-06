import React, { useEffect, useState } from 'react'
import './search.css'
import UseFetch from '../../hooks/busqueda'
import { Link } from 'react-router-dom'
import Card from '../card/Card'
import Loader from '../loader/Loader'
import {tShirt, hoodies, Accesories, Pants} from '../../products'

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
  const [products, setProducts] = useState(false)

  useEffect(() => {
    const combineArrays = () => {
      const combinedArray = [...tShirt, ...hoodies, ...Accesories, ...Pants];
      // const shuffledArray = combinedArray.sort(() => Math.random() - 0.5);
      const objetoEncontrado = combinedArray.filter(objeto => objeto.title.toLowerCase().includes(busqueda.toLowerCase()));
      setProducts(objetoEncontrado);

      
    };

    combineArrays();
  }, [busqueda]);
  

  return (
    <div
      className={`containerSearchSearch ${
        mobile == true ? 'container_desk' : 'container_mobile'
      }
      `}
    >
      {products.length >= 1 && (
        products.slice(0, max).map(item => (
          <Card
            item={item}
            key={item.id}
            type='link'
            mobile={mobile}
            setMobileSearch={setMobileSearch}
            setHide={setHide}
          />
   
        ))
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
