'use client'

import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ProductInfoProps {
  title: string
  rating: number
  reviews: number
  inStock: boolean
  price: number
  originalPrice: number
  description: string
}

export default function ProductInfo({
  title,
  rating,
  reviews,
  inStock,
  price,
  originalPrice,
  description,
}: ProductInfoProps) {
  const hasDiscount = price < originalPrice
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2'>
              {title}
            </h1>
            <div className='flex items-center gap-4 text-sm'>
              <div className='flex items-center text-yellow-500'>
                <Star className='w-4 h-4 fill-current' />
                <span className='ml-1 font-medium text-foreground'>
                  {rating || 4.5}
                </span>
              </div>
              <span className='text-muted-foreground'>
                ({reviews || 0} Reviews)
              </span>
              {inStock ? (
                <span className='text-green-600 font-medium'>In Stock</span>
              ) : (
                <span className='text-red-600 font-medium'>Out of Stock</span>
              )}
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground hover:text-red-500'
          >
            <Heart className='w-6 h-6' />
          </Button>
        </div>
      </div>

      <Separator />

      <div className='flex items-baseline gap-4'>
        <span className='text-3xl font-bold text-foreground'>
          EGP {price.toLocaleString('en-US')}
        </span>
        {hasDiscount && (
          <>
            <span className='text-lg text-muted-foreground line-through'>
              EGP {originalPrice.toLocaleString('en-US')}
            </span>
            <Badge variant='destructive' className='text-sm'>
              Save {discountPercent}%
            </Badge>
          </>
        )}
      </div>

      <p className='text-muted-foreground leading-relaxed'>{description}</p>
    </div>
  )
}
