import React, { useEffect, useState } from 'react'
import './filter.css'
import { IoIosMenu, IoIosArrowDown } from 'react-icons/io'

const Filter = ({
  activeBar,
  products,
  maxPrice,
  setMaxPrice,
  setSelectedSubCats,
  selectedSubCats,
  setSort
}) => {
  const [selected, setSelected] = useState(null)
  //   const [selected, setSelected] = useState(null)
  const [isFirstCall, setIsFirstCall] = useState(true);
  

  const toggle = i => {
    if (selected === i) {
      return setSelected(null)
    }

    setSelected(i)
  }
  
  
  const handleChange = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;
  
    if (isFirstCall) {
      setSelectedSubCats([value]);
      setIsFirstCall(false);
    } else {
      setSelectedSubCats(prevSelectedSubCats => {
        if (isChecked) {
          return [...prevSelectedSubCats, value];
        } else {
          return prevSelectedSubCats.filter(item => item !== value);
        }
      });
    }
  };

  return (
    <div className={`${activeBar ? 'aside_bar_active' : ''} aside_bar`}>
      <div className='filterItem'>
        <div
          className={selected == 1 ? `titleCat show` : `titleCat`}
          onClick={() => toggle(1)}
        >
          <span>TIPO DE ROPA</span> <IoIosArrowDown />
        </div>
        <div className={selected == 1 ? `content show` : `content`}>
        
              <div  className='typeoff'>
                <label htmlFor='0'>T-Shirt</label>
                <input
                  type='checkbox'
                  id='0'
                  value={0}
                  onChange={handleChange}
                />
              </div>
              <div  className='typeoff'>
                <label htmlFor='2'>Hoodies</label>
                <input
                  type='checkbox'
                  id='2'
                  value={2}
                  onChange={handleChange}
                />
              </div>
              <div  className='typeoff'>
                <label htmlFor='3'>Accessories</label>
                <input
                  type='checkbox'
                  id='3'
                  value={3}
                  onChange={handleChange}
                />
              </div>
              <div  className='typeoff'>
                <label htmlFor='1'>Pants</label>
                <input
                  type='checkbox'
                  id='1'
                  value={1}
                  onChange={handleChange}
                />
              </div>
              {/* <div key={item.id} className='typeoff'>
                <label htmlFor={item.id}>{item.attributes.title}</label>
                <input
                  type='checkbox'
                  id={item.id}
                  value={item.id}
                  onChange={handleChange}
                />
              </div> */}
        </div>
      </div>

      <div className='filterItem'>
        <div
          className={selected == 2 ? `titleCat show` : `titleCat`}
          onClick={() => toggle(2)}
        >
          <span>FILTRAR POR PRECIO</span> <IoIosArrowDown />
        </div>
        <div className={selected == 2 ? `content show` : `content`}>
          <div>
            <span>0</span>
            <input
              type='range'
              min={10}
              max={500}
              onChange={e => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* <div className='filterItem'>
        <div
          className={selected == 3 ? `titleCat show` : `titleCat`}
          onClick={() => toggle(3)}
        >
          <span>ORGANIZAR POR</span> <IoIosArrowDown />
        </div>
        <div
          className={`${
            selected == 3 ? `content show` : `content`
          } inputFilter`}
        >
          <div>
            <input
              type='radio'
              id='asc'
              value='asc'
              name='price'
              onChange={e => setSort('asc')}
            />
            <label htmlFor='asc'>Precio (menor primero)</label>
          </div>
          <div>
            <input
              type='radio'
              id='desc'
              value='desc'
              name='price'
              onChange={e => setSort('desc')}
            />
            <label htmlFor='desc'>Precio (alto primero)</label>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Filter
