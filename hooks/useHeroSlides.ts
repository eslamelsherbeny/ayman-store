/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useHeroSlides.ts
import { useState, useEffect } from 'react'
import { getProducts } from '@/services/productService'

// تعريف شكل البيانات اللي السلايدر محتاجها
export interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
  buttonText: string
  link: string
}

export const useHeroSlides = () => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setIsLoading(true)
        // بنطلب أحدث 5 منتجات (تأكد ان الباك ايند يدعم الـ query params دول او عدلهم حسب الحاجة)
        // الـ query string يعتمد على طريقة بناءك للـ API features في الباك اند
        const products = await getProducts('?limit=5&sort=-createdAt')

        if (products && products.length > 0) {
          // تحويل شكل المنتج لشكل السلايد
          const mappedSlides: Slide[] = products.map((product: any) => ({
            id: product._id || product.id,
            image: product.imageCover, // صورة الغلاف من الباك اند
            title: product.title,
            subtitle: product.description.substring(0, 100) + '...', // بناخد جزء من الوصف
            buttonText: 'تسوق الآن', // نص ثابت أو ممكن تخليه ديناميكي لو عندك حقل في الداتابيز
            link: `/products/${product.slug}`, // الرابط لصفحة تفاصيل المنتج
          }))
          setSlides(mappedSlides)
        } else {
          // لو مفيش منتجات راجعة، ممكن نسيب المصفوفة فاضية أو نحط صور افتراضية
          setSlides([])
        }
      } catch (error) {
        console.error('Failed to fetch hero slides', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlides()
  }, [])

  return { slides, isLoading }
}
