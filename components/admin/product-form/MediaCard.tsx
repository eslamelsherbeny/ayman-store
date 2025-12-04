import { Image as ImageIcon, X, PlusCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ImageUpload from '@/components/custom/image-upload'
import { useRef } from 'react'

interface Props {
  imageCover: File | string | null
  images: (File | string)[]
  onCoverChange: (file: File | null) => void
  onGalleryAdd: (e: React.ChangeEvent<HTMLInputElement>) => void
  onGalleryRemove: (index: number) => void
  onViewImage: (url: string) => void
  loading: boolean
}

export default function MediaCard({
  imageCover,
  images,
  onCoverChange,
  onGalleryAdd,
  onGalleryRemove,
  onViewImage,
  loading,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const getPreviewUrl = (img: File | string) =>
    typeof img === 'string' ? img : URL.createObjectURL(img)

  return (
    <Card className='border-gray-200 shadow-xl bg-white rounded-2xl'>
      <CardHeader className='pb-4 pt-5 px-6 border-b border-gray-100'>
        <CardTitle className='text-xl font-bold flex items-center gap-3 text-gray-900'>
          <ImageIcon className='h-5 w-5 text-gray-600' /> Product Media
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 px-6 pb-6 pt-5'>
        <div className='space-y-2'>
          <Label className='text-sm font-semibold text-gray-700'>
            Cover Image <span className='text-red-500'>*</span>
          </Label>
          <ImageUpload
            value={imageCover}
            onChange={onCoverChange}
            onRemove={() => onCoverChange(null)}
            onView={onViewImage}
            disabled={loading}
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-sm font-semibold text-gray-700'>
            Gallery (Optional)
          </Label>
          <div className='grid grid-cols-4 gap-4'>
            {images.map((img, index) => (
              <div
                key={index}
                className='relative aspect-square border-2 border-gray-300 rounded-xl overflow-hidden group cursor-pointer hover:opacity-80 transition-opacity'
                onClick={() => onViewImage(getPreviewUrl(img))}
              >
                <img
                  src={getPreviewUrl(img)}
                  alt={`Gallery ${index}`}
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    onGalleryRemove(index)
                  }}
                  className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-10'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <div
                className='relative aspect-square border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-100 cursor-pointer'
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={onGalleryAdd}
                  className='hidden'
                />
                <PlusCircle className='h-8 w-8 text-gray-400' />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
