import { useState, useEffect } from 'react'
import { getProducts } from '@/services/productService'

export const useTopRated = () => {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        setIsLoading(true)
        // بنطلب المنتجات الأعلى تقييماً
        const data = await getProducts('?sort=-ratingsAverage&limit=8')

        if (Array.isArray(data)) {
          const mapped = data.map((p: any) => ({
            id: p._id,
            title: p.title,
            slug: p.slug,
            price: p.priceAfterDiscount || p.price,
            oldPrice: p.priceAfterDiscount ? p.price : undefined,
            image: p.imageCover,
            category: p.category?.name || 'Top Rated',
            rating: p.ratingsAverage, // لو عندك الحقل ده
          }))
          setProducts(mapped)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTopRated()
  }, [])

  return { products, isLoading }
}
