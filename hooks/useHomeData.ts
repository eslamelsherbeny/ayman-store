/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { getProducts } from '@/services/productService'
import { toast } from 'sonner'

// 1. تعريف الواجهة بشكل كامل وصحيح لتطابق ProductCard
export interface Product {
  id: string
  _id?: string
  title: string
  slug: string
  price: number
  oldPrice?: number
  image: string // الصورة الأساسية للعرض
  imageCover: string // الاسم القادم من الباك إند
  category: string
  isNew?: boolean
  rating?: number
}

export const useHomeData = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true)

        // جلب البيانات بالتوازي للأداء الأفضل (أسرع من انتظار كل واحد لوحده)
        const [bestSellersRes, trendingRes] = await Promise.all([
          getProducts('?sort=-sold&limit=4'),
          getProducts('?sort=-ratingsAverage&limit=8'), // أو -createdAt للأحدث
        ])

        // 🛠️ دالة مساعدة لضبط شكل البيانات (Mapping)
        // دي بتحول البيانات الخام للشكل اللي الفرونت إند محتاجه وتمنع أخطاء التايب سكريبت
        const mapProducts = (data: any): Product[] => {
          // التعامل بمرونة سواء البيانات جت مصفوفة مباشرة أو داخل data.data
          const productsArray = Array.isArray(data) ? data : data?.data || []

          return productsArray.map((p: any) => ({
            id: p._id || p.id,
            _id: p._id,
            title: p.title,
            // 💡 الحل السحري: التأكد من وجود slug (لو مش موجود نستخدم id كبديل)
            slug: p.slug || p._id,

            // ضبط الأسعار والخصومات
            price: p.priceAfterDiscount || p.price,
            oldPrice: p.priceAfterDiscount ? p.price : undefined,

            // ضبط الصور
            image: p.imageCover || '',
            imageCover: p.imageCover || '',

            // ضبط القسم
            category: p.category?.name || 'General',

            // بيانات إضافية
            rating: p.ratingsAverage || 0,
            isNew: p.sold > 20, // مثال: لو مبيعاته عالية نعتبره مميز
          }))
        }

        // تطبيق الدالة وحفظ البيانات في الحالة
        setBestSellers(mapProducts(bestSellersRes))
        setTrendingProducts(mapProducts(trendingRes))
      } catch (error) {
        console.error('Failed to fetch home data', error)
        toast.error('Failed to load home page data')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return { bestSellers, trendingProducts, loading }
}
