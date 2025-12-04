'use client'

import Link from 'next/link'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Timer } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const saleProducts = [
  {
    id: 101,
    title: 'Embroided Kaftan',
    category: 'Sale',
    price: 120.0,
    oldPrice: 200.0,
    image:
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 102,
    title: 'Winter Wool Scarf',
    category: 'Sale',
    price: 15.0,
    oldPrice: 30.0,
    image:
      'https://images.pexels.com/photos/4246231/pexels-photo-4246231.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 103,
    title: 'Leather Sandals',
    category: 'Men',
    price: 40.0,
    oldPrice: 65.0,
    image:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 104,
    title: 'Home Prayer Mat',
    category: 'Home',
    price: 25.0,
    oldPrice: 45.0,
    image:
      'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 105,
    title: 'Modern Beige Abaya',
    category: 'Abayas',
    price: 95.0,
    oldPrice: 140.0,
    image:
      'https://images.pexels.com/photos/9967812/pexels-photo-9967812.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export default function FlashSale() {
  return (
    // تغيير الخلفية للون مختلف قليلاً للتمييز (bg-muted/30)
    <section className='py-20 border-y border-border bg-muted/30'>
      <div className='container mx-auto px-4 md:px-6'>
        {/* Header بتنسيق جديد */}
        <div className='flex flex-col md:flex-row items-end md:items-center justify-between mb-8 gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-red-600 font-bold tracking-wider text-sm uppercase'>
              <Timer className='h-4 w-4' />
              <span>Limited Time Offer</span>
            </div>

            <div className='flex flex-col md:flex-row md:items-center gap-6'>
              <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                Flash Sale
              </h2>

              {/* العداد بتصميم أنيق */}
              <div className='flex items-center gap-2'>
                <TimeBox val='02' label='Days' />
                <span className='font-bold text-xl text-muted-foreground'>
                  :
                </span>
                <TimeBox val='14' label='Hrs' />
                <span className='font-bold text-xl text-muted-foreground'>
                  :
                </span>
                <TimeBox val='35' label='Mins' />
              </div>
            </div>
          </div>

          <Button asChild variant='default' className='rounded-full px-6'>
            <Link href='/sale'>
              View All Deals <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* تحويل الجريد إلى كاروسيل (سلايدر) لإعطاء حركة للموقع */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full'
        >
          <CarouselContent className='-ml-4'>
            {saleProducts.map((p) => (
              // basis-1/2 للموبايل (منتجين)، basis-1/4 للديسكتوب (4 منتجات)
              <CarouselItem
                key={p.id}
                className='pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <ProductCard {...p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* أزرار التنقل */}
          <div className='hidden md:block'>
            <CarouselPrevious className='left-0 -translate-x-1/2' />
            <CarouselNext className='right-0 translate-x-1/2' />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

// مكون صغير للعداد لتقليل التكرار في الكود
const TimeBox = ({ val, label }: { val: string; label: string }) => (
  <div className='flex flex-col items-center justify-center w-12 h-12 bg-foreground text-background rounded-lg shadow-sm'>
    <span className='font-bold text-lg leading-none'>{val}</span>
    <span className='text-[9px] uppercase opacity-70 font-medium'>{label}</span>
  </div>
)
