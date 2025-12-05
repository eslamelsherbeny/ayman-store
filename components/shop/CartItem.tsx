'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItemProps {
  id: number
  title: string
  image: string
  price: number
  quantity: number
  size: string
  color: string
}

export default function CartItem({
  id,
  title,
  image,
  price,
  quantity,
  size,
  color,
}: CartItemProps) {
  return (
    <div className='flex gap-4 py-4 border-b border-border last:border-0'>
      {/* 1. Product Image */}
      <div className='relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted'>
        <Image src={image} alt={title} fill className='object-cover' />
      </div>

      {/* 2. Details & Controls */}
      <div className='flex flex-1 flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-sm md:text-base font-medium text-foreground line-clamp-2'>
              <Link href={`/product/${id}`} className='hover:underline'>
                {title}
              </Link>
            </h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Size: {size} | Color: {color}
            </p>
          </div>
          <p className='text-sm md:text-base font-bold text-foreground'>
            ${(price * quantity).toFixed(2)}
          </p>
        </div>

        <div className='flex justify-between items-center mt-4'>
          {/* Quantity Controls */}
          <div className='flex items-center border border-border rounded-md h-8 md:h-9'>
            <button
              className='px-2 md:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 h-full transition-colors'
              aria-label='Decrease quantity'
            >
              <Minus className='w-3 h-3 md:w-4 md:h-4' />
            </button>
            <span className='w-8 md:w-10 text-center text-xs md:text-sm font-medium'>
              {quantity}
            </span>
            <button
              className='px-2 md:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 h-full transition-colors'
              aria-label='Increase quantity'
            >
              <Plus className='w-3 h-3 md:w-4 md:h-4' />
            </button>
          </div>

          {/* Remove Button */}
          <Button
            variant='ghost'
            size='sm'
            className='text-red-500 hover:text-red-600 hover:bg-red-50 h-8 md:h-9 px-2 md:px-3'
          >
            <Trash2 className='w-4 h-4 md:mr-2' />
            <span className='hidden md:inline'>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
