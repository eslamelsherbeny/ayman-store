'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Undo2, LayoutGrid } from 'lucide-react'
import { toast } from 'sonner'

// استدعاء الدوال من ملف الخدمة
import { createSubCategory } from '@/services/subCategoryService'
import { getCategories } from '@/services/categoryService'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CategoryType {
  _id: string
  name: string
}

export default function AddSubCategoryPage() {
  const router = useRouter()

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // 1. جلب الأقسام الرئيسية عند تحميل الصفحة
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data.data || data)
      } catch (error) {
        toast.error('Failed to load parent categories. Check your API.')
      } finally {
        setFetching(false)
      }
    }
    loadCategories()
  }, [])

  // دالة لتحديث القسم الأب المختار (تربط قيمة الـ Select بالـ State)
  const handleCategoryChange = (catId: string) => {
    setParentCategory(catId)
  }

  // 2. دالة الإرسال
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) return toast.error('Please enter the subcategory name')
    if (!parentCategory) return toast.error('Please select a parent category')

    setLoading(true)
    try {
      await createSubCategory({
        name,
        category: parentCategory, // ID القسم الأب
      })

      toast.success('✅ Subcategory Created Successfully')
      setName('')
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Error saving subcategory'
      toast.error('❌ ' + msg)
    } finally {
      setLoading(false)
    }
  }

  // 3. مساعدة لعرض اسم الأب في المعاينة
  const selectedParentName =
    categories.find((c) => c._id === parentCategory)?.name || 'Select Parent'

  return (
    <div className='flex flex-col gap-6 p-6 max-w-5xl mx-auto w-full'>
      {/* Header Compact */}
      <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
        <div>
          <h1 className='text-xl font-bold tracking-tight text-gray-900'>
            Create Subcategory
          </h1>
          <p className='text-xs text-gray-500 mt-0.5'>
            Link a new sub-group to a main category.
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.back()}
          className='gap-2 h-8 text-xs'
        >
          <Undo2 className='h-3.5 w-3.5' /> Cancel
        </Button>
      </div>

      <div className='grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start'>
        {/* === Left Column: Form Inputs === */}
        <div className='space-y-4'>
          <Card className='border-gray-200 shadow-sm'>
            <CardHeader className='pb-2 pt-3 px-4'>
              <CardTitle className='text-sm font-semibold flex items-center gap-2'>
                <LayoutGrid className='h-4 w-4' /> Subcategory Details
              </CardTitle>
              <CardDescription className='text-xs'>
                Select the parent category and define the new group.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5 px-4 pb-4 pt-4'>
              {/* 1. Parent Selector */}
              <div className='space-y-1.5'>
                <Label className='text-xs font-medium text-gray-700 uppercase tracking-wide'>
                  Parent Category <span className='text-red-500'>*</span>
                </Label>
                {fetching ? (
                  <div className='h-9 w-full border rounded-md bg-gray-50 flex items-center px-3 text-sm text-gray-400'>
                    <Loader2 className='h-3.5 w-3.5 animate-spin mr-2' />{' '}
                    Loading categories...
                  </div>
                ) : (
                  <Select
                    onValueChange={handleCategoryChange}
                    value={parentCategory}
                  >
                    <SelectTrigger className='h-9 text-sm border-gray-300 focus:border-black transition-all'>
                      <SelectValue placeholder='Select Main Category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat._id}
                          value={cat._id}
                          className='text-sm py-2'
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* 2. Subcategory Name */}
              <div className='space-y-1.5'>
                <Label className='text-xs font-medium text-gray-700 uppercase tracking-wide'>
                  Subcategory Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  placeholder='e.g. Abayas'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='h-9 text-sm border-gray-300 focus:border-black transition-all'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* === Right Column: Hierarchy Preview === */}
        <div className='sticky top-4 space-y-4'>
          <h3 className='text-xs font-bold text-gray-500 uppercase tracking-wider pl-1'>
            Hierarchy Preview
          </h3>

          <Card className='overflow-hidden border border-gray-200 shadow-md bg-white p-6'>
            <div className='flex flex-col items-center justify-center space-y-3 text-center'>
              {/* Parent Block */}
              <div className='w-full p-3 bg-gray-100 rounded-lg border border-gray-200'>
                <span className='text-[10px] uppercase text-gray-400 font-bold block mb-1'>
                  Parent
                </span>
                <span className='text-sm font-bold text-gray-800'>
                  {selectedParentName}
                </span>
              </div>

              {/* Arrow */}
              <div className='text-gray-300'>
                <LayoutGrid className='h-4 w-4' />
              </div>

              {/* Subcategory Block */}
              <div className='w-full p-3 bg-black text-white rounded-lg shadow-md'>
                <span className='text-[10px] uppercase text-gray-400 font-bold block mb-1'>
                  New Subcategory
                </span>
                <span className='text-sm font-bold'>{name || 'Name...'}</span>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleSubmit}
            className='w-full h-9 text-sm font-bold bg-gray-900 hover:bg-black text-white shadow-md transition-all rounded-md'
            disabled={loading || fetching}
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' /> Create Subcategory
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
