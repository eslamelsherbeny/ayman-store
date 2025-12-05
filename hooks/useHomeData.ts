// src/hooks/useHomeData.ts
'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/services/productService'
import { toast } from 'sonner'

// تعريف نوع المنتج (نفس الواجهة المستخدمة في المكونات)
export interface Product {
  _id: string
  title: string
  slug: string
  imageCover: string
  price: number
  priceAfterDiscount?: number
  category?: { name: string }
  ratingsQuantity?: number
}

export const useHomeData = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true)

        // 1. جلب الأكثر مبيعاً
        const bestSellersRes = await getProducts('?sort=-sold&limit=4')

        // 2. جلب المنتجات الرائجة (الأحدث)
        const trendingRes = await getProducts('?sort=-createdAt&limit=8')

        // 🛠️ التصحيح هنا: المتغير bestSellersRes هو المصفوفة نفسها
        // لذلك نستخدمه مباشرة بدون .data
        setBestSellers(bestSellersRes || [])
        setTrendingProducts(trendingRes || [])
      } catch (error) {
        console.error(error)
        toast.error('Failed to load home page data')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return { bestSellers, trendingProducts, loading }
}
