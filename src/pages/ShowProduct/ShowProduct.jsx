import React, { useEffect, useState } from 'react'
import AllProducts from '../../components/AllProducts/AllProduct'
import { useParams } from 'react-router-dom'
import { tShirt, hoodies, Accesories, Pants } from '../../products';

const ShowProduct = () => {
  const producto = useParams().product
  const [products, setProducts] = useState(false)
  console.log(producto);

  useEffect(() => {
    const combineArrays = () => {
      setProducts(producto);

      
    };

    combineArrays();
  }, [producto]);
  return (
    <div>
      <AllProducts urlShowProduct={'all'} producto={products}  />
    </div>
  )
}

export default ShowProduct
