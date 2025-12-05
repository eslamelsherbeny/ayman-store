'use client'

import Link from 'next/link'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Trophy } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useBestSellers } from '@/hooks/useBestSellers'

export default function BestSellers() {
  const { products, isLoading } = useBestSellers()

  if (isLoading) {
    return (
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4 md:px-6'>
          <Skeleton className='h-8 w-48 mb-8' />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className='h-[350px] w-full rounded-xl' />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!isLoading && products.length === 0) return null

  return (
    <section className='py-16 bg-background'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex items-end justify-between mb-8'>
          <div className='flex flex-col gap-1'>
            <h2 className='flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground'>
              Best Sellers{' '}
              <Trophy className='h-6 w-6 text-yellow-500 fill-yellow-500' />
            </h2>
            <p className='text-sm text-muted-foreground'>
              Top favorites loved by our customers.
            </p>
          </div>
          <Button
            asChild
            variant='link'
            className='hidden md:flex gap-2 text-primary font-semibold'
          >
            <Link href='/products?sort=-sold'>
              View All <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product} // ✅ الآن يحتوي على slug لأننا حدثنا الهوك
              className='hover:-translate-y-1 transition-transform duration-300'
            />
          ))}
        </div>

        <div className='mt-8 text-center md:hidden'>
          <Button asChild variant='outline' className='rounded-full w-full'>
            <Link href='/products?sort=-sold'>View Best Sellers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
