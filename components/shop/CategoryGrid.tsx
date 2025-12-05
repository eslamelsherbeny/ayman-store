'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategories } from '@/hooks/useCategories'

export default function CategoryGrid() {
  const { categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex justify-between mb-8'>
            <Skeleton className='h-8 w-48' />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className='w-full h-[300px] rounded-2xl' />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!isLoading && categories.length === 0) return null

  return (
    <section className='py-16 bg-background'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex justify-between items-end mb-8'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Shop by Category
          </h2>
          <Link
            href='/products'
            className='hidden md:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group'
          >
            View All{' '}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${cat._id}`}
              className='group relative block h-[300px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500'
            >
              <Image
                src={cat.image || ''}
                alt={cat.name}
                fill
                className='object-cover object-center transition-transform duration-700 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80' />
              <div className='absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                <h3 className='text-2xl font-bold text-white mb-1 capitalize'>
                  {cat.name}
                </h3>
                <div className='flex items-center text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                  Shop Now <ArrowRight className='ml-2 h-4 w-4' />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
