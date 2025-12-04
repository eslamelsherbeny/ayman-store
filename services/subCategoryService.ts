import api from './api'

interface SubCategoryData {
  name: string
  category: string // ID of the parent category
}

// 1. إنشاء قسم فرعي جديد (POST)
export const createSubCategory = async (subCategoryData: SubCategoryData) => {
  // هنا بنبعت JSON عادي
  const response = await api.post('/subcategories', subCategoryData)
  return response.data
}

// 2. جلب الأقسام الفرعية (لصفحة عرض المنتجات أو قائمة فرعية)
export const getSubCategories = async () => {
  const response = await api.get('/subcategories')
  return response.data
}

// 3. جلب الأقسام الفرعية التابعة لقسم رئيسي محدد (مهم لصفحة المنتجات)
export const getSubCategoriesByCategory = async (categoryId: string) => {
  // ⚠️ تأكد أن هذا الـ endpoint صحيح في الباك إند بتاعك
  // مثال: /api/v1/subcategories?category=ID
  const response = await api.get(`/subcategories?category=${categoryId}`)
  return response.data
}
