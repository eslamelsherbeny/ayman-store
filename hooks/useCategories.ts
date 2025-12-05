/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { getCategories } from '@/services/categoryService' // أو categoryService حسب تسميتك

// 1. تعريف شكل القسم
export interface Category {
  _id: string
  name: string
  slug?: string
  image?: string
}

// 2. صور احتياطية عشان لو القسم مفيهوش صورة (شغل احترافي عشان الشكل ميبوظش)
const FALLBACK_IMAGES: Record<string, string> = {
  // اكتب هنا أسماء الأقسام بتاعتك بالحروف الصغيرة (lowercase)
  men: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
  women:
    'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=600',
  abayas:
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
  accessories:
    'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600',
  default:
    'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=600',
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const response = await getCategories()

        // 💡 تأمين قراءة البيانات:
        // بنشوف لو البيانات جاية في response.data.data (زي المنتجات) أو response.data مباشرة
        const data = response.data || response

        if (Array.isArray(data)) {
          // دمج الصور الاحتياطية
          const processedData = data.map((cat: any) => ({
            ...cat,
            // لو القسم جاي معاه صورة من الباك اند خدها، لو لأ.. دور في الصور الاحتياطية
            image:
              cat.image ||
              FALLBACK_IMAGES[cat.name.toLowerCase()] ||
              FALLBACK_IMAGES['default'],
          }))
          setCategories(processedData)
        } else {
          console.error('Categories response is not an array:', data)
          setCategories([])
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, isLoading, error }
}
