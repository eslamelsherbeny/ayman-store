'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { getProductById } from '@/services/productService'
import { Loader2 } from 'lucide-react'

export default function EditProductPage() {
  const { id } = useParams()
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(id as string)
        console.log(data)
        setProductData(data)
      } catch (error) {
        console.error('Failed to fetch product', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-gray-500' />
      </div>
    )
  }

  return <ProductForm initialData={productData} isEditing={true} />
}
