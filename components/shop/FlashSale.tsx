'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Timer, Flame } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { useFlashSale } from '@/hooks/useFlashSale'
import ProductCard from './ProductCard'
import { cn } from '@/lib/utils'

// =======================
// Component TimeBox خارجي
// =======================
const TimeBox = ({
  val,
  label,
  isLast,
}: {
  val: string
  label: string
  isLast?: boolean
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center w-9 h-9 md:w-11 md:h-11 bg-foreground text-background rounded-lg shadow-sm',
      isLast && 'bg-red-600 text-white'
    )}
  >
    <span className='font-bold text-sm md:text-lg leading-none'>{val}</span>
    <span className='text-[8px] uppercase opacity-75 font-medium'>{label}</span>
  </div>
)

export default function FlashSale() {
  const { products, isLoading, timeLeft } = useFlashSale()

  if (isLoading) {
    return (
      <section className='py-8 border-y border-border bg-muted/30'>
        <div className='container mx-auto px-4 md:px-6'>
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

  if (!isLoading && products.length === 0) return null

  const itemCount = products.length
  let basisClass = 'lg:basis-1/4'
  if (itemCount === 1) basisClass = 'lg:basis-1/3'
  else if (itemCount === 2) basisClass = 'lg:basis-1/2'
  else if (itemCount === 3) basisClass = 'lg:basis-1/3'

  const showArrows = itemCount > 4

  const formatTime = (time: number | string) =>
    Number(time) < 10 ? `0${time}` : time.toString()

  return (
    <section
      className='py-8 md:py-10 border-y border-border/50 bg-gradient-to-b from-muted/30 to-background'
      dir='ltr'
    >
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col lg:flex-row items-end lg:items-center justify-between mb-6 gap-4'>
          <div className='flex flex-col gap-2 w-full lg:w-auto'>
            <div className='flex items-center gap-1.5 text-red-600 font-bold tracking-wider text-[10px] md:text-xs uppercase animate-pulse'>
              <Timer className='h-3 w-3' /> <span>Limited Time Offer</span>
            </div>
            <div className='flex flex-col md:flex-row md:items-center gap-4 md:gap-6'>
              <h2 className='flex items-center gap-2 text-2xl md:text-3xl font-black tracking-tight text-foreground'>
                Flash Sale{' '}
                <Flame className='h-6 w-6 text-orange-500 fill-orange-500' />
              </h2>
              <div className='flex items-center gap-2'>
                {Number(timeLeft.days) > 0 && (
                  <>
                    <TimeBox val={formatTime(timeLeft.days)} label='D' />
                    <span>:</span>
                  </>
                )}
                <TimeBox val={formatTime(timeLeft.hours)} label='H' />
                <span>:</span>
                <TimeBox val={formatTime(timeLeft.minutes)} label='M' />
                <span>:</span>
                <TimeBox val={formatTime(timeLeft.seconds)} label='S' isLast />
              </div>
            </div>
          </div>
          <Button
            asChild
            variant='ghost'
            size='sm'
            className='hidden md:flex hover:bg-transparent hover:text-primary p-0 h-auto font-semibold'
          >
            <Link
              href='/products?sale=true'
              className='flex items-center gap-1'
            >
              View All <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>

        <Carousel
          opts={{ align: 'start', loop: showArrows }}
          className='w-full'
        >
          <CarouselContent className='-ml-4 pb-2'>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className={cn('pl-4 basis-1/2 md:basis-1/3', basisClass)}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  slug={product.slug}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  category={product.category}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {showArrows && (
            <div className='hidden lg:block'>
              <CarouselPrevious className='-left-4 h-10 w-10 border-muted-foreground/20 bg-background/80 backdrop-blur-sm' />
              <CarouselNext className='-right-4 h-10 w-10 border-muted-foreground/20 bg-background/80 backdrop-blur-sm' />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}
