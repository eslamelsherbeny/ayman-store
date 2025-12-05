'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image' // 1. استيراد مكون الصور
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
import { useHeroSlides } from '@/hooks/useHeroSlides'
import { Skeleton } from '@/components/ui/skeleton'

// بيانات افتراضية
const FALLBACK_SLIDES = [
  {
    id: 'default-1',
    image:
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'أناقة عصرية',
    subtitle: 'اكتشف أحدث صيحات الموضة لدينا بأفضل الأسعار.',
    buttonText: 'تصفح المتجر',
    link: '/shop',
  },
]

export default function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )

  const { slides, isLoading } = useHeroSlides()
  const activeSlides = slides.length > 0 ? slides : FALLBACK_SLIDES

  if (isLoading) {
    return (
      <section className='w-full py-4'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='relative w-full h-[350px] md:h-[500px] overflow-hidden rounded-none md:rounded-lg'>
            <Skeleton className='w-full h-full' />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='w-full py-4 animate-in fade-in duration-700'>
      <div className='container mx-auto px-4 md:px-6'>
        <Carousel
          plugins={[plugin.current]}
          className='w-full overflow-hidden rounded-none md:rounded-lg shadow-2xl'
          opts={{
            loop: true,
            align: 'start',
          }}
        >
          <CarouselContent className='ml-0'>
            {activeSlides.map((slide) => (
              <CarouselItem key={slide.id} className='pl-0'>
                {/* هنا التحكم في ارتفاع السلايدر 
                   h-[400px] للموبايل و md:h-[600px] للشاشات الكبيرة
                   زودنا الارتفاع شوية عشان الصورة تاخد راحتها
                */}
                <div className='relative w-full h-[400px] md:h-[600px] group'>
                  {/* 2. استخدام Next/Image بدلاً من الخلفية */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill // تملأ الحاوية بالكامل
                    priority // يحمل الصورة بسرعة لأنها في أول الشاشة
                    className='object-cover object-top transition-transform duration-1000 group-hover:scale-105'
                    // object-top: بيخلي الصورة تبدأ من فوق (عشان لو صورة شخص راسه متتقطعش)
                    // object-cover: بيقص الزيادات عشان يملأ الشاشة
                  />

                  {/* طبقة تظليل */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

                  {/* المحتوى */}
                  <div className='absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto mt-8 md:mt-0'>
                    <span className='inline-block py-1.5 px-4 rounded-full bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-bold mb-4 uppercase tracking-widest shadow-lg animate-in slide-in-from-bottom-4 duration-500'>
                      وصل حديثاً
                    </span>

                    <h1 className='text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg leading-tight animate-in slide-in-from-bottom-5 duration-700 delay-100'>
                      {slide.title}
                    </h1>

                    <p className='text-sm md:text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed hidden sm:block drop-shadow-md animate-in slide-in-from-bottom-6 duration-700 delay-200'>
                      {slide.subtitle}
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300'>
                      <Button
                        asChild
                        size='lg'
                        className='bg-white text-black hover:bg-white/90 border-none font-bold text-base h-12 px-8 rounded-full shadow-lg transition-all hover:scale-105'
                      >
                        <Link href={slide.link}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='hidden lg:flex left-4 border-none bg-black/20 text-white hover:bg-black/50 hover:text-white h-12 w-12 rounded-full backdrop-blur-md' />
          <CarouselNext className='hidden lg:flex right-4 border-none bg-black/20 text-white hover:bg-black/50 hover:text-white h-12 w-12 rounded-full backdrop-blur-md' />
        </Carousel>
      </div>
    </section>
  )
}
