'use client'

import { useState, useMemo } from 'react'
import {
  Loader2,
  Save,
  Undo2,
  Image as ImageIcon,
  Maximize2,
  X,
  Trash2,
} from 'lucide-react'
import { createCategory } from '@/services/categoryService'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'
import ImageUpload from '@/components/custom/image-upload'

export default function AddCategoryPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const previewUrl = useMemo(() => {
    if (!file) return ''
    return URL.createObjectURL(file)
  }, [file])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return toast.error('Please enter a category name')
    if (!file) return toast.error('Please upload an image')

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', file)

      await createCategory(formData)
      toast.success('Category created successfully!')
      setName('')
      setFile(null)
    } catch (error: any) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Something went wrong'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-5 p-5 max-w-5xl mx-auto w-full'>
      {/* Header (Slimmer) */}
      <div className='flex items-center justify-between border-b border-gray-100 pb-3'>
        <div>
          <h1 className='text-xl font-bold tracking-tight text-gray-900'>
            Create Category
          </h1>
          <p className='text-xs text-gray-500 mt-0.5'>
            Add a new main category to your store.
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

      <div className='grid lg:grid-cols-[1.5fr_1fr] gap-5 items-start'>
        {/* === Left Column: Inputs === */}
        <div className='space-y-4'>
          <Card className='border-gray-200 shadow-sm'>
            <CardHeader className='pb-2 pt-3 px-4'>
              <CardTitle className='text-sm font-semibold'>
                Category Details
              </CardTitle>
              <CardDescription className='text-xs'>
                Basic information.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-4 px-4 pb-4'>
              <div className='space-y-1.5'>
                <Label className='text-xs font-medium text-gray-700 uppercase tracking-wide'>
                  Category Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  placeholder="e.g. Women's Fashion"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='h-9 text-sm border-gray-300 focus:border-black transition-all'
                />
              </div>

              <div className='space-y-1.5'>
                <Label className='text-xs font-medium text-gray-700 uppercase tracking-wide'>
                  Category Image <span className='text-red-500'>*</span>
                </Label>
                <ImageUpload
                  value={file}
                  onChange={setFile}
                  onRemove={() => setFile(null)}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* === Right Column: Live Preview === */}
        <div className='sticky top-3 space-y-3'>
          <h3 className='text-xs font-bold text-gray-500 uppercase tracking-wider pl-1'>
            Live Preview
          </h3>

          <Card className='overflow-hidden border border-gray-200 shadow-sm bg-white'>
            <div className='p-3'>
              <div className='h-48 w-full bg-gray-50 relative flex items-center justify-center border border-dashed border-gray-200 rounded-lg overflow-hidden group'>
                {previewUrl ? (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className='relative w-full h-full cursor-zoom-in'>
                          <img
                            src={previewUrl}
                            alt='Preview'
                            className='w-full h-full object-contain'
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className='max-w-4xl w-auto p-0 border-none bg-transparent shadow-none flex items-center justify-center'>
                        <DialogTitle className='hidden'>Image View</DialogTitle>
                        <div className='relative'>
                          <DialogClose className='absolute -top-10 right-0 z-50 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer shadow-lg'>
                            <X className='h-5 w-5 text-black' />
                          </DialogClose>
                          <img
                            src={previewUrl}
                            alt='Zoomed'
                            className='w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl'
                          />
                        </div>
                      </DialogContent>
                    </Dialog>

                    <button
                      type='button'
                      onClick={() => setFile(null)}
                      className='absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 hover:text-red-600 rounded-full shadow-sm text-gray-500 transition-colors opacity-0 group-hover:opacity-100 z-10'
                      title='Remove'
                    >
                      <Trash2 className='h-3.5 w-3.5' />
                    </button>
                  </>
                ) : (
                  <div className='flex flex-col items-center gap-1.5 text-gray-300'>
                    <ImageIcon className='h-8 w-8 opacity-20' />
                    <span className='text-xs font-medium text-gray-400'>
                      No Image
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className='px-4 pb-4 pt-0 text-center'>
              <h3 className='text-base font-bold text-gray-900 truncate'>
                {name || (
                  <span className='text-gray-300 italic font-normal'>
                    Category Name
                  </span>
                )}
              </h3>
              <p className='text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide'>
                0 Products
              </p>
            </div>
          </Card>

          <Button
            onClick={handleSubmit}
            className='w-full h-9 text-sm font-bold bg-gray-900 hover:bg-black text-white shadow-md transition-all rounded-md'
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' /> Save Category
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
