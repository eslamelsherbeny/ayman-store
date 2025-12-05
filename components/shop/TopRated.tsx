'use client'

import { Star } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import ProductCard from './ProductCard'
import { useTopRated } from '@/hooks/useTopRated'

export default function TopRated() {
  const { products, isLoading } = useTopRated()

  if (isLoading) {
    return (
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <Skeleton className='h-8 w-48 mb-6' />
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className='h-[300px] w-full rounded-xl' />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className='py-16 bg-background'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex items-center gap-2 mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
            Top Rated Products
          </h2>
          <Star className='h-6 w-6 text-yellow-500 fill-yellow-500' />
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className='w-full'>
          <CarouselContent className='-ml-4 pb-4'>
            {products.map((p) => (
              <CarouselItem
                key={p.id}
                className='pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <ProductCard {...p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='hidden md:block'>
            <CarouselPrevious className='-left-4' />
            <CarouselNext className='-right-4' />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
