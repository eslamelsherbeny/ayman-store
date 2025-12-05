import { useState, useEffect } from 'react'
import { getProducts } from '@/services/productService'

export interface FlashProduct {
  id: string
  title: string
  slug: string // ✅ تمت الإضافة
  price: number
  oldPrice: number
  image: string
  category: string
  discount: number
}

export const useFlashSale = () => {
  const [products, setProducts] = useState<FlashProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setIsLoading(true)
        const data = await getProducts()
        const deals = (Array.isArray(data) ? data : [])
          .filter(
            (p: any) => p.priceAfterDiscount && p.priceAfterDiscount < p.price
          )
          .slice(0, 10)
          .map((p: any) => ({
            id: p._id,
            title: p.title,
            slug: p.slug, // ✅ جلب الـ slug
            price: p.priceAfterDiscount,
            oldPrice: p.price,
            image: p.imageCover,
            category: p.category?.name || 'Sale',
            discount: Math.round(
              ((p.price - p.priceAfterDiscount) / p.price) * 100
            ),
          }))
        setProducts(deals)
      } catch (error) {
        console.error('Failed to fetch flash sales', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDeals()
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const target = new Date()
      target.setHours(23, 59, 59, 999)
      const difference = target.getTime() - now.getTime()
      if (difference > 0) {
        setTimeLeft({
          days: 0,
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()
    return () => clearInterval(timer)
  }, [])

  return { products, isLoading, timeLeft }
}
