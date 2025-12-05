import { useState, useEffect } from 'react'
import { getProducts } from '@/services/productService'

export interface Product {
  id: string
  title: string
  slug: string // ✅ تمت الإضافة
  price: number
  oldPrice?: number
  image: string
  category: string
  isNew?: boolean
}

export const useBestSellers = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setIsLoading(true)
        const data = await getProducts('?sort=-sold&limit=4')

        if (Array.isArray(data)) {
          const mappedProducts = data.map((p: any) => ({
            id: p._id,
            title: p.title,
            slug: p.slug, // ✅ جلب الـ slug من الباك إند
            price: p.priceAfterDiscount || p.price,
            oldPrice: p.priceAfterDiscount ? p.price : undefined,
            image: p.imageCover,
            category: p.category?.name || 'Best Seller',
            isNew: p.sold > 20,
          }))
          setProducts(mappedProducts)
        }
      } catch (error) {
        console.error('Failed to fetch best sellers', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBestSellers()
  }, [])

  return { products, isLoading }
}
