// =========================================================
// ملف: src/services/productService.ts (المحتوى المُعدَّل)
// =========================================================

import api from './api' // يتم استيراد الإعدادات الخاصة بـ Axios

// 📌 تعريف الواجهة (لضمان تطابق الأنواع)
interface Product {
  _id: string
  title: string
  price: number
  quantity: number
  categoryName: string
  isPublished: boolean
}

// 1. إنشاء منتج جديد (POST)
// يستقبل FormData لأنه يرسل ملفات (صور الغلاف والمعرض)
export const createProduct = async (formData: FormData) => {
  const response = await api.post('/products', formData)
  return response.data
}

// 2. جلب كل المنتجات (GET)
export const getProducts = async (query = ''): Promise<Product[]> => {
  try {
    const response = await api.get(`/products${query}`)

    // 💡 نقطة التصحيح: التحقق من بنية الاستجابة.
    // نفترض أن البيانات تأتي في response.data.data (النمط الشائع)
    const data = response.data.data || response.data

    if (Array.isArray(data)) {
      return data // إذا كانت مصفوفة، نُرجعها
    }

    // إذا كانت البنية غير متوقعة، نرجع مصفوفة فارغة لتجنب الخطأ
    console.error(
      'API Response for getProducts was not an array:',
      response.data
    )
    return []
  } catch (error) {
    console.error('Error fetching products:', error)
    // في حالة وجود خطأ في الشبكة أو الخادم، نُرجع مصفوفة فارغة
    return []
  }
}

// 3. جلب منتج محدد بالـ ID (GET)
export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`)

  // ✅ التعديل الحاسم هنا:
  // نحن نريد ما بداخل مفتاح "data" في الاستجابة
  return response.data.data
}
export const getProductBySlug = async (slug: string) => {
  // تأكد أن هذا المسار يطابق المسار الذي أضفته في الباك إند (/api/v1/products/slug/:slug)
  const response = await api.get(`/products/slug/${slug}`)
  return response.data.data || response.data
}

// 4. تحديث منتج محدد (PUT/PATCH)
// يستخدم FormData في حالة تحديث الصور أيضاً
export const updateProduct = async (id: string, productData: FormData) => {
  const response = await api.put(`/products/${id}`, productData)
  return response.data
}

// 5. حذف منتج (DELETE)
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}
