import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import './catShowProducts.css';
import Loader from '../loader/Loader';
import { tShirt, hoodies, Accesories, Pants } from '../../products';

const CatShowProducts = ({
  subCats,
  maxPrice,
  sort,
  catId,
  urlShowProduct,
  producto = '',
  sex
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (urlShowProduct === 'gender') {
          const combinedArray = [...tShirt, ...hoodies, ...Accesories, ...Pants];
          const objetoEncontrado = combinedArray.filter(objeto => objeto.genero === sex && objeto.price <= maxPrice && subCats.includes(objeto.catType));
          setProducts(objetoEncontrado);
          
          
        }

        if (producto === '*') {
          const combinedArray = [...tShirt, ...hoodies, ...Accesories, ...Pants];
          const productosFiltrados = combinedArray.filter(objeto => objeto.price <= maxPrice && subCats.includes(objeto.catType));
          setProducts(productosFiltrados);
     }

     if(producto !== '*' && producto !== ''){
      const combinedArray = [...tShirt, ...hoodies, ...Accesories, ...Pants];
      const productosFiltrados = combinedArray.filter(objeto => objeto.title.toLowerCase().includes(producto.toLowerCase()) && objeto.price <= maxPrice && subCats.includes(objeto.catType));
      setProducts(productosFiltrados);
 }
// if(producto !== '*' && producto !== '') {

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [subCats, sort, maxPrice, producto, urlShowProduct, sex]);

  return (
    <div className='container'>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div>NO HAY RESULTADOS, INTENTA CAMBIAR LOS FILTROS</div>
      ) : (
        <div>
          <br />
          <div className='product_card_container'>
            {products.map(item => (
              <>
              
              <Card item={item} type='link' key={item.id} />
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatShowProducts;