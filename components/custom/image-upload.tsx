'use client'

import React, { useRef, useMemo } from 'react'
import { UploadCloud, X, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  value?: File | string | null
  onChange: (file: File | null) => void
  onRemove: () => void
  disabled?: boolean
  // 👇 التعديل هنا: ضفنا علامة الاستفهام (؟) عشان تبقى اختيارية
  onView?: (imageUrl: string) => void
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  onView,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  const imageUrl = useMemo(() => {
    if (typeof value === 'string') {
      return value
    }
    if (value && value instanceof File && value.type.startsWith('image/')) {
      return URL.createObjectURL(value)
    }
    return null
  }, [value])

  // 1. حالة وجود ملف أو صورة
  if (value) {
    const fileName = value instanceof File ? value.name : 'Existing Image'
    const fileSize =
      value instanceof File
        ? (value.size / 1024 / 1024).toFixed(2) + ' MB'
        : 'Server File'

    return (
      <div className='relative w-full flex items-center gap-4 p-2.5 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-gray-300 transition-colors'>
        {imageUrl ? (
          <div
            // 👇 التعديل هنا: نتأكد إن الدالة موجودة قبل ما نستدعيها
            onClick={() => onView && onView(imageUrl)}
            className={`relative w-16 h-16 rounded-md overflow-hidden shrink-0 transition-opacity ${
              onView ? 'cursor-pointer hover:opacity-80' : ''
            }`}
            title={onView ? 'Click to view image' : ''}
          >
            <img
              src={imageUrl}
              alt='Selected file preview'
              className='w-full h-full object-cover'
            />
            {/* إظهار تأثير الهوفر فقط لو فيه دالة عرض */}
            {onView && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all'></div>
            )}
          </div>
        ) : (
          <div className='p-3 bg-blue-50 text-blue-600 rounded-md shrink-0'>
            <FileText className='h-5 w-5' />
          </div>
        )}

        <div className='flex flex-col truncate flex-1 min-w-0'>
          <span className='text-xs font-semibold text-gray-900 truncate'>
            {fileName}
          </span>
          <span className='text-[10px] text-gray-500 font-mono'>
            {fileSize}
          </span>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
            if (inputRef.current) inputRef.current.value = ''
          }}
          className='h-7 w-7 text-gray-400 hover:text-red-600 hover:bg-red-50'
          disabled={disabled}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    )
  }

  // 2. حالة الرفع
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className='border border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 hover:border-gray-400 transition-all text-center cursor-pointer relative group bg-white'
    >
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileSelect}
        disabled={disabled}
      />
      <div className='flex flex-col items-center gap-2'>
        <div className='p-2 bg-gray-100 text-gray-600 rounded-full group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300'>
          <UploadCloud className='h-5 w-5' />
        </div>
        <div className='space-y-0.5'>
          <p className='text-xs font-semibold text-gray-900'>Click to upload</p>
          <p className='text-[10px] text-gray-500'>SVG, PNG, JPG (max 2MB)</p>
        </div>
      </div>
    </div>
  )
}
