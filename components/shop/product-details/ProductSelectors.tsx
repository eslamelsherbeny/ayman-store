'use client'

import { useState } from 'react'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductSelectorsProps {
  colors: string[]
  sizes: string[]
  maxQuantity: number
}

export default function ProductSelectors({
  colors,
  sizes,
  maxQuantity,
}: ProductSelectorsProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || '')
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [quantity, setQuantity] = useState(1)

  return (
    <div className='space-y-6'>
      {/* Colors */}
      {colors.length > 0 && (
        <div>
          <h3 className='text-sm font-medium mb-3'>
            Color:{' '}
            <span className='font-normal text-gray-500'>{selectedColor}</span>
          </h3>
          <div className='flex gap-3 flex-wrap'>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-sm transition-all relative ${
                  selectedColor === color
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'hover:border-gray-400'
                }`}
                style={{
                  backgroundColor: color.startsWith('#') ? color : color,
                }}
                title={color}
              >
                {selectedColor === color && (
                  <Check
                    className={`w-4 h-4 ${
                      ['white', '#ffffff'].includes(color.toLowerCase())
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <div>
          <div className='flex justify-between mb-3'>
            <h3 className='text-sm font-medium'>
              Size:{' '}
              <span className='font-normal text-gray-500'>{selectedSize}</span>
            </h3>
            <button className='text-xs text-primary underline'>
              Size Guide
            </button>
          </div>
          <div className='flex flex-wrap gap-3'>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[48px] h-10 px-3 flex items-center justify-center border rounded-md text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className='flex flex-col sm:flex-row gap-4 pt-4'>
        <div className='flex items-center border rounded-md w-32 justify-between px-3 h-12'>
          <button
            className='text-muted-foreground hover:text-foreground disabled:opacity-50'
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className='w-4 h-4' />
          </button>
          <span className='font-semibold'>{quantity}</span>
          <button
            className='text-muted-foreground hover:text-foreground disabled:opacity-50'
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= maxQuantity}
          >
            <Plus className='w-4 h-4' />
          </button>
        </div>
        <Button
          size='lg'
          className='flex-1 h-12 text-base uppercase tracking-wider font-bold'
          disabled={maxQuantity < 1}
        >
          {maxQuantity > 0 ? (
            <>
              <ShoppingCart className='mr-2 h-5 w-5' /> Add to Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </Button>
      </div>
    </div>
  )
}
