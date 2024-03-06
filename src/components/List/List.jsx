import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './list.css'
import {tShirt, hoodies, Accesories, Pants} from '../../products'
const List = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(4);
  

  const counter = 4
  const handleLoadMore = () => {
    if (loadMore == counter) {
      setLoadMore(12)
      return
    }

    setLoadMore(counter)
  }

  useEffect(() => {
    const combineArrays = () => {
      const combinedArray = [...tShirt, ...hoodies, ...Accesories, ...Pants];
      // const shuffledArray = combinedArray.sort(() => Math.random() - 0.5);
      const objetoEncontrado = combinedArray.filter(objeto => objeto.type === type);
      setProducts(objetoEncontrado);
    };

    combineArrays();
  }, []);
  
 

  return (
    <div className='container_section'>
      <h1>{type}</h1>
      <div className='products'>
      {products.slice(0, loadMore).map((item) => (
          <Card item={item} type='link' key={item.id} />
        ))}
      </div>
      <button onClick={handleLoadMore}>Ver Más</button>
    </div>
  )
}

export default List
