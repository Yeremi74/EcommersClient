import React from 'react'
import List from '../../components/List/List.jsx'
import { Link, useParams } from 'react-router-dom'
import './home.css'

const Home = () => {
  return (
    <div>
      <div className='main'>
        <h2>New Collection</h2>
        <p>Explore your style</p>
      </div>
      <List type='top selles' />
      <div className='sections_container'>
        <div className='gender_container'>
          <Link to='/products/mujeres/1' className='section women'>
            <div className='img'></div>
            <p>Mujeres</p>
          </Link>
          <Link to='/products/hombres/2' className='section men'>
            <div className='img'></div>
            <p>Hombres</p>
          </Link>
        </div>
        <div className='gender_container'>
          <Link to='/catalogo/*' className='section catalogo'>
            <div className='img'></div>
            <p>Catalogo</p>
          </Link>
        </div>
      </div>
      <List type='featured' />
    </div>
  )
}

export default Home
