import { useEffect, useState } from 'react'

const UseFetch = busqueda => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `https://real-eyes-strapi.onrender.com/api/products?populate=*&[filters][title][$containsi]=${busqueda}`
        )
        const data = await res.json()
        setData(data.data)
      } catch (err) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
    console.log(data)
    console.log(busqueda)
  }, [busqueda])

  return { data, loading, error }
}

export default UseFetch
