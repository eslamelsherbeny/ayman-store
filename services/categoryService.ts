import api from './api'

// 1. إنشاء قسم جديد (POST)
// بنستقبل FormData لأننا بنرفع صورة
export const createCategory = async (formData: FormData) => {
  const response = await api.post('/categories', formData, {
    headers: {
      // مهم جداً عشان السيرفر يفهم إن فيه ملفات مبعوتة
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// 2. جلب كل الأقسام (GET)
export const getCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

// 3. جلب قسم محدد بالـ ID (GET)
export const getCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`)
  return response.data
}

// 4. حذف قسم (DELETE)
export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`)
  return response.data
}
