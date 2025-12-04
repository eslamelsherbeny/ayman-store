import { Tag, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Category {
  _id: string
  name: string
}

interface Props {
  categories: Category[]
  subCategoriesList: Category[]
  selectedCategory: string
  selectedSubcategories: string[]
  onCategoryChange: (val: string) => void
  onAddSubcategory: (val: string) => void
  onRemoveSubcategory: (val: string) => void
}

export default function OrganizationCard({
  categories,
  subCategoriesList,
  selectedCategory,
  selectedSubcategories,
  onCategoryChange,
  onAddSubcategory,
  onRemoveSubcategory,
}: Props) {
  return (
    <Card className='border-gray-200 shadow-xl bg-white rounded-2xl'>
      <CardHeader className='pb-3 pt-4 px-6 border-b border-gray-100'>
        <CardTitle className='text-xl font-bold flex items-center gap-3 text-gray-900'>
          <Tag className='h-5 w-5 text-gray-600' /> Organization
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-5 px-6 pb-6 pt-4'>
        <div className='space-y-2'>
          <Label className='text-sm font-semibold text-gray-700'>
            Category <span className='text-red-500'>*</span>
          </Label>
          <Select onValueChange={onCategoryChange} value={selectedCategory}>
            <SelectTrigger className='h-10 border-gray-300 rounded-lg'>
              <SelectValue placeholder='Select Main Category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-3'>
          <Label className='text-sm font-semibold text-gray-700'>
            Subcategories
          </Label>
          <Select onValueChange={onAddSubcategory} disabled={!selectedCategory}>
            <SelectTrigger className='h-10 border-gray-300 rounded-lg'>
              <SelectValue placeholder='Select subcategories...' />
            </SelectTrigger>
            <SelectContent>
              {subCategoriesList.length === 0 ? (
                <SelectItem disabled value='no-subs'>
                  No subcategories available
                </SelectItem>
              ) : (
                subCategoriesList.map((sub) => (
                  <SelectItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {selectedSubcategories.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {selectedSubcategories.map((subId) => {
                const subName =
                  subCategoriesList.find((s) => s._id === subId)?.name ||
                  'Loading...'
                return (
                  <Badge
                    key={subId}
                    variant='secondary'
                    className='pl-2 pr-1 py-1 h-7 flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100'
                  >
                    {subName}
                    <button
                      type='button'
                      onClick={() => onRemoveSubcategory(subId)}
                      className='ml-1 text-blue-400 hover:text-blue-600 transition-colors'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
