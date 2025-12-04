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

const slides = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Modest Elegance',
    subtitle:
      "Discover the finest collection of Abayas and Men's traditional wear.",
    buttonText: 'Shop Women',
    link: '/women',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: "Traditional Men's Wear",
    subtitle: 'Authentic Thobes and Kaftans crafted with perfection.',
    buttonText: 'Shop Men',
    link: '/men',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Ramadan Essentials',
    subtitle: 'Get ready for the holy month with our exclusive sets.',
    buttonText: 'View Collection',
    link: '/accessories',
  },
]

export default function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section className='w-full py-4'>
      {/* 1. المحاذاة: استخدام container لضبط العرض مع باقي الموقع */}
      <div className='container mx-auto px-4 md:px-6'>
        <Carousel
          plugins={[plugin.current]}
          // 2. الحواف: إزالة rounded-xl ليكون حاداً ومسطرة
          className='w-full overflow-hidden'
          opts={{
            loop: true,
            align: 'start',
          }}
        >
          <CarouselContent className='ml-0'>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className='pl-0'>
                <div className='relative w-full h-[350px] md:h-[500px] overflow-hidden'>
                  {/* الخلفية */}
                  <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className='absolute inset-0 bg-black/40' />
                  </div>

                  {/* المحتوى */}
                  <div className='relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto'>
                    <span className='inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium mb-3 uppercase tracking-widest border border-white/20'>
                      New Collection 2025
                    </span>

                    <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight'>
                      {slide.title}
                    </h1>

                    <p className='text-sm md:text-lg text-gray-200 mb-6 max-w-xl leading-relaxed hidden sm:block'>
                      {slide.subtitle}
                    </p>

                    <div className='flex flex-col sm:flex-row gap-3'>
                      <Button
                        asChild
                        size='default'
                        className='bg-white text-black hover:bg-gray-200 hover:text-black border-none text-sm h-10 px-6'
                      >
                        <Link href={slide.link}>{slide.buttonText}</Link>
                      </Button>

                      <Button
                        asChild
                        variant='outline'
                        size='default'
                        className='bg-transparent text-white border-white hover:bg-white hover:text-black text-sm h-10 px-6'
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

          <CarouselPrevious className='hidden md:flex left-4 bg-transparent border-white/50 text-white hover:bg-white hover:text-black hover:border-white h-10 w-10' />
          <CarouselNext className='hidden md:flex right-4 bg-transparent border-white/50 text-white hover:bg-white hover:text-black hover:border-white h-10 w-10' />
        </Carousel>
      </div>
    </section>
  )
}
