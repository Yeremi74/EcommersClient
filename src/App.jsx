import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import Products from './pages/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ShowProduct from './pages/ShowProduct/ShowProduct'
import { useState } from 'react'
const Layout = () => {
  const [hide, setHide] = useState(false)
  console.log(hide)
  return (
    <div className={`${hide ? 'app_hide' : ''} app`}>
      <Navbar hide={hide} setHide={setHide} />
      <Outlet />
      <Footer />
    </div>
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
        path: '/showAllProduct/:product',
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
