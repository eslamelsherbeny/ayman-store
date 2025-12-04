'use client'

import { useState, useEffect } from 'react'

// هوك مخصص لجلب البيانات من أي دالة API
const useFetch = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await apiFunction()
        setData(result)
      } catch (err) {
        setError(err.message || 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [apiFunction, ...dependencies])

  return { data, isLoading, error }
}

export default useFetch
