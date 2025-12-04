'use client'

import { useState } from 'react'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProductGalleryProps {
  images: string[]
  title: string
  discountPercent: number
  hasDiscount: boolean
}

export default function ProductGallery({
  images,
  title,
  discountPercent,
  hasDiscount,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Lightbox Handlers
  const openLightbox = () => {
    const index = images.indexOf(selectedImage)
    setLightboxIndex(index !== -1 ? index : 0)
  }
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))
  }
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    )
  }

  return (
    <div className='flex flex-col gap-4 w-full max-w-[500px] mx-auto lg:mx-0'>
      {/* Main Image */}
      <div
        className='aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group cursor-zoom-in'
        onClick={openLightbox}
      >
        <img
          src={selectedImage}
          alt={title}
          className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
        />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'>
          <Maximize2 className='w-6 h-6' />
        </div>
        {hasDiscount && (
          <span className='absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10'>
            SALE {discountPercent}%
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center lg:justify-start'>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                selectedImage === img
                  ? 'border-black ring-1 ring-black'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                className='w-full h-full object-cover'
                alt={`thumb-${index}`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className='fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200'
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className='absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-50'
          >
            <X className='w-8 h-8' />
          </button>
          <button
            onClick={prevImage}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50'
          >
            <ChevronLeft className='w-10 h-10' />
          </button>
          <div
            className='relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center select-none'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt='Zoomed'
              className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
            />
          </div>
          <button
            onClick={nextImage}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50'
          >
            <ChevronRight className='w-10 h-10' />
          </button>
        </div>
      )}
    </div>
  )
}
