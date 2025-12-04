'use client'

import * as React from 'react'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// بيانات السلايدات (الصور والكلام)
const slides = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1920', // صورة مودرن للمحجبات
    title: 'Elegance in Modesty',
    subtitle: 'Discover our new premium Abaya collection for the modern woman.',
    buttonText: 'Shop Women',
    link: '/women',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1593089935922-19396d7560b6?q=80&w=1920&auto=format&fit=crop', // صورة رجالي فخمة
    title: "Traditional Men's Wear",
    subtitle: 'Authentic Thobes and Kaftans crafted with perfection.',
    buttonText: 'Shop Men',
    link: '/men',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=1920', // صورة اكسسوارات/صلاة
    title: 'Ramadan Essentials',
    subtitle: 'Get ready for the holy month with our exclusive prayer sets.',
    buttonText: 'View Collection',
    link: '/accessories',
  },
]

export default function HeroSlider() {
  // إعدادات الحركة التلقائية (كل 5 ثواني)
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section className='w-full bg-black'>
      <Carousel
        plugins={[plugin.current]}
        className='w-full'
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              {/* ارتفاع البانر: للموبايل 500px وللشاشات الكبيرة 700px */}
              <div className='relative w-full h-[500px] lg:h-[700px] overflow-hidden'>
                {/* 1. الصورة الخلفية */}
                <div
                  className='absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105'
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  {/* طبقة سوداء شفافة عشان الكلام يبان بوضوح */}
                  <div className='absolute inset-0 bg-black/40' />
                </div>

                {/* 2. المحتوى الكلامي (فوق الصورة) */}
                <div className='relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto'>
                  {/* عنوان فرعي صغير */}
                  <span className='inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-medium mb-4 uppercase tracking-widest border border-white/30'>
                    New Collection 2025
                  </span>

                  {/* العنوان الرئيسي */}
                  <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight'>
                    {slide.title}
                  </h1>

                  {/* الوصف */}
                  <p className='text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed'>
                    {slide.subtitle}
                  </p>

                  {/* الأزرار */}
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button
                      asChild
                      size='lg'
                      className='bg-white text-black hover:bg-gray-200 hover:text-black border-none text-base h-12 px-8'
                    >
                      <Link href={slide.link}>{slide.buttonText}</Link>
                    </Button>

                    <Button
                      asChild
                      variant='outline'
                      size='lg'
                      className='bg-transparent text-white border-white hover:bg-white hover:text-black text-base h-12 px-8'
                    >
                      <Link href='/sale'>
                        Explore Offers <ArrowRight className='ml-2 h-4 w-4' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* أزرار التقليب (مخفية في الموبايل، ظاهرة في الديسكتوب) */}
        <CarouselPrevious className='hidden md:flex left-4 bg-transparent border-white text-white hover:bg-white hover:text-black' />
        <CarouselNext className='hidden md:flex right-4 bg-transparent border-white text-white hover:bg-white hover:text-black' />
      </Carousel>
    </section>
  )
}
