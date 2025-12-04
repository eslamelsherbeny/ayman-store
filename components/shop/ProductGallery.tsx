'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* 1. الصورة الكبيرة (Main Image) - تظهر في الأعلى */}
      <div className='relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/3] bg-muted rounded-xl overflow-hidden shadow-sm'>
        <img
          src={images[selectedImage]}
          alt='Main Product'
          className='w-full h-full object-cover object-center transition-all duration-500 ease-in-out'
        />
        {/* Sale Badge (اختياري) */}
        <span className='absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm'>
          Sale
        </span>
      </div>

      {/* 2. الصور المصغرة (Thumbnails) - تظهر في الأسفل كشريط أفقي */}
      <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
              selectedImage === index
                ? 'border-primary ring-2 ring-primary/20' // تمييز الصورة المختارة
                : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'
            )}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className='w-full h-full object-cover object-center'
            />
          </button>
        ))}
      </div>
    </div>
  )
}
