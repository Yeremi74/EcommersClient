import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import Products from './pages/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ShowProduct from './pages/ShowProduct/ShowProduct'
import { useState } from 'react'
import { CartContext } from './contexts/CartContext'
const Layout = () => {
  const [hide, setHide] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [cartActive, setCartActive] = useState(false)
  return (
    <CartContext.Provider value={{ cartActive, setCartActive }}>
      <div className={`${hide ? 'app_hide' : ''} app`}>
        <Navbar
          hide={hide}
          setHide={setHide}
          setMobileSearch={setMobileSearch}
          mobileSearch={mobileSearch}
          cartActive={cartActive}
          setCartActive={setCartActive}
        />
        <Outlet />
        <Footer />
      </div>
    </CartContext.Provider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/products/:sex/:id',
        element: <Products />
      },
      {
        path: '/catalogo/:product',
        element: <ShowProduct />
      }
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
