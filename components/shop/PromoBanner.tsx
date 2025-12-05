'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// 1. تعريف الخصائص عشان تقدر تغير المحتوى من بره
interface PromoBannerProps {
  badge?: string // النص الصغير (مثلاً: Limited Time)
  title?: string // العنوان الرئيسي
  description?: string // الوصف
  image?: string // رابط الصورة
  link?: string // رابط الزرار
  reverse?: boolean // لو عايز تعكس مكان الصورة والنص
  className?: string
}

export default function PromoBanner({
  badge = 'Ramadan Exclusive',
  title = "Modesty Meets <span class='text-primary'>Elegance</span>", // يدعم HTML للألوان
  description = 'Get up to 40% off on our exclusive traditional collection. Designed for comfort and style this holy month.',
  image = 'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=1200', // صورة افتراضية شيك
  link = '/sale',
  reverse = false,
  className,
}: PromoBannerProps) {
  return (
    <section className={cn('py-16 md:py-24 w-full', className)}>
      <div className='container mx-auto px-4 md:px-6'>
        {/* البوكس الرئيسي: بتصميم Grid وقص الحواف */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-900 text-white rounded-[2rem] overflow-hidden shadow-2xl'>
          {/* --- 1. نصف الصورة (Image Side) --- */}
          <div
            className={cn(
              'relative h-[400px] lg:h-[600px] w-full group overflow-hidden',
              reverse ? 'lg:order-2' : 'lg:order-1' // التحكم في الترتيب
            )}
          >
            <Image
              src={image}
              alt='Promo Banner'
              fill
              className='object-cover object-top transition-transform duration-[2000ms] ease-out group-hover:scale-110'
            />
            {/* طبقة تظليل خفيفة */}
            <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500' />
          </div>

          {/* --- 2. نصف المحتوى (Content Side) --- */}
          <div
            className={cn(
              'flex flex-col justify-center items-start p-8 md:p-16 lg:p-20 bg-zinc-900/95 backdrop-blur-sm',
              reverse ? 'lg:order-1' : 'lg:order-2'
            )}
          >
            {/* Badge */}
            <div className='flex items-center gap-2 mb-6'>
              <span className='flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-yellow-400'>
                <Sparkles className='w-4 h-4' />
              </span>
              <span className='text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-400 border border-white/10 px-3 py-1 rounded-full'>
                {badge}
              </span>
            </div>

            {/* Title (يدعم تلوين كلمات معينة) */}
            <h2
              className='text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6'
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Description */}
            <p className='text-lg text-gray-400 leading-relaxed max-w-md mb-8'>
              {description}
            </p>

            {/* Action Button */}
            <Button
              asChild
              size='lg'
              className='rounded-full bg-white text-black hover:bg-gray-200 h-14 px-10 text-base font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            >
              <Link href={link} className='flex items-center gap-2'>
                Discover Offers <ArrowRight className='h-5 w-5' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
