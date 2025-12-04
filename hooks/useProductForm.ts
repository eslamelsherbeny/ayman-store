/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createProduct, updateProduct } from '@/services/productService'
import { getCategories } from '@/services/categoryService'
import { getSubCategoriesByCategory } from '@/services/subCategoryService'

export interface CategoryType {
  _id: string
  name: string
}

export interface FormDataState {
  title: string
  description: string
  price: string
  discount: string
  quantity: string
  category: string
  subcategory: string
  subcategories: string[]
  imageCover: File | string | null
  images: (File | string)[]
  colors: string[]
  sizes: string[]
}

export const useProductForm = (initialData: any, isEditing: boolean) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchingCats, setFetchingCats] = useState(true)

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [subCategoriesList, setSubCategoriesList] = useState<CategoryType[]>([])

  // States للعرض
  const [viewingImage, setViewingImage] = useState<string | null>(null)
  const [customColorHex, setCustomColorHex] = useState('#000000')

  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    description: '',
    price: '',
    discount: '',
    quantity: '',
    category: '',
    subcategory: '',
    subcategories: [],
    imageCover: null,
    images: [],
    colors: [],
    sizes: [],
  })

  const cleanUrl = (url: any) => {
    if (!url || typeof url !== 'string') return null
    if (url.includes('http://localhost:3000/products/')) {
      return url.replace('http://localhost:3000/products/', '')
    }
    return url
  }

  // 1. تحميل البيانات الأولية
  useEffect(() => {
    if (isEditing && initialData && !fetchingCats) {
      const cleanCover = cleanUrl(initialData.imageCover)
      let cleanImages: string[] = []
      if (Array.isArray(initialData.images)) {
        cleanImages = initialData.images
          .map((img: any) => cleanUrl(img))
          .filter(Boolean)
      }

      let calculatedDiscount = ''
      if (
        initialData.price &&
        initialData.priceAfterDiscount &&
        initialData.priceAfterDiscount < initialData.price
      ) {
        const discountVal =
          ((initialData.price - initialData.priceAfterDiscount) /
            initialData.price) *
          100
        calculatedDiscount = Math.round(discountVal).toString()
      }

      let selectedCategoryId = ''
      if (initialData.category) {
        if (typeof initialData.category === 'string')
          selectedCategoryId = initialData.category
        else if (initialData.category._id)
          selectedCategoryId = initialData.category._id
        else if (initialData.category.name && categories.length > 0) {
          const found = categories.find(
            (c) => c.name === initialData.category.name
          )
          if (found) selectedCategoryId = found._id
        }
      }

      let initialSubs: string[] = []
      if (
        initialData.subcategories &&
        Array.isArray(initialData.subcategories)
      ) {
        initialSubs = initialData.subcategories
          .map((sub: any) => (typeof sub === 'object' ? sub._id : sub))
          .filter(Boolean)
      }

      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price ? String(initialData.price) : '',
        discount: calculatedDiscount,
        quantity: initialData.quantity ? String(initialData.quantity) : '',
        category: selectedCategoryId,
        subcategory:
          initialData.subcategory?._id || initialData.subcategory || '',
        subcategories: initialSubs,
        imageCover: cleanCover,
        images: cleanImages,
        colors: initialData.colors || [],
        sizes: initialData.sizes || [],
      })

      if (selectedCategoryId) handleCategoryChange(selectedCategoryId, false)
    }
  }, [initialData, isEditing, categories, fetchingCats])

  const finalPriceDisplay = useMemo(() => {
    const p = parseFloat(formData.price)
    const d = parseFloat(formData.discount) || 0
    if (isNaN(p) || p <= 0) return '0.00'
    const discounted = p - (p * d) / 100
    return discounted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [formData.price, formData.discount])

  // 2. جلب الفئات
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories()
        const rawArray = data.data || data
        setCategories(
          Array.isArray(rawArray)
            ? rawArray.filter((cat: any) => cat && cat._id)
            : []
        )
      } catch (err) {
        toast.error('Failed to load categories')
      } finally {
        setFetchingCats(false)
      }
    }
    fetchCats()
  }, [])

  // --- Handlers ---
  const handleCategoryChange = async (catId: string, resetSub = true) => {
    if (resetSub)
      setFormData((prev) => ({ ...prev, category: catId, subcategories: [] }))
    if (!catId) {
      setSubCategoriesList([])
      return
    }
    try {
      const data = await getSubCategoriesByCategory(catId)
      const rawArray = data.data || data
      setSubCategoriesList(
        Array.isArray(rawArray)
          ? rawArray.filter((sub: CategoryType) => sub && sub._id)
          : []
      )
    } catch (err) {
      setSubCategoriesList([])
    }
  }

  const addSubcategory = (subId: string) => {
    if (!formData.subcategories.includes(subId))
      setFormData((prev) => ({
        ...prev,
        subcategories: [...prev.subcategories, subId],
      }))
  }
  const removeSubcategory = (subId: string) =>
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((id) => id !== subId),
    }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const val = value.replace(/[^0-9.]/g, '')
    setFormData((prev) => ({ ...prev, [name]: val }))
  }

  const handleImageCoverChange = (file: File | null) =>
    setFormData((prev) => ({ ...prev, imageCover: file }))

  const handleGalleryImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const filesToAdd = files
        .slice(0, 5 - formData.images.length)
        .filter((f) => f instanceof File)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesToAdd],
      }))
    }
    e.target.value = ''
  }

  const handleGalleryImageRemove = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))

  const toggleVariant = (type: 'colors' | 'sizes', value: string) => {
    setFormData((prev) => {
      const list = prev[type]
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      }
    })
  }

  const addCustomColor = () => {
    if (!formData.colors.includes(customColorHex))
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, customColorHex],
      }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.price || !formData.imageCover)
      return toast.error('Please fill required fields')
    setLoading(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('price', formData.price)
      data.append('quantity', formData.quantity)

      const priceVal = parseFloat(formData.price)
      const discount = parseFloat(formData.discount) || 0
      if (discount > 0) {
        const final = priceVal - (priceVal * discount) / 100
        if (final < priceVal)
          data.append('priceAfterDiscount', final.toString())
      }

      if (formData.category) data.append('category', formData.category)
      formData.subcategories.forEach((s) => data.append('subcategories', s))
      formData.colors.forEach((c) => data.append('colors', c))
      formData.sizes.forEach((s) => data.append('sizes', s))
      if (formData.imageCover instanceof File)
        data.append('imageCover', formData.imageCover)
      formData.images.forEach((img) => {
        if (img instanceof File) data.append('images', img)
      })

      if (isEditing && initialData?._id) {
        await updateProduct(initialData._id, data)
        toast.success('Updated Successfully!')
      } else {
        await createProduct(data)
        toast.success('Created Successfully!')
      }
      router.push('/admin/products')
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    loading,
    fetchingCats,
    categories,
    subCategoriesList,
    finalPriceDisplay,
    viewingImage,
    setViewingImage,
    customColorHex,
    setCustomColorHex,
    handleChange,
    handleNumberChange,
    handleCategoryChange,
    addSubcategory,
    removeSubcategory,
    handleImageCoverChange,
    handleGalleryImageAdd,
    handleGalleryImageRemove,
    toggleVariant,
    addCustomColor,
    handleSubmit,
  }
}
