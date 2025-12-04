'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 2000])

  return (
    <div className='space-y-6 pb-10'>
      {/* رأس القائمة */}
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-lg tracking-tight'>Filters</h3>
        <Button
          variant='ghost'
          size='sm'
          className='text-muted-foreground hover:text-primary h-auto p-0'
        >
          Reset
        </Button>
      </div>

      <Separator />

      <Accordion
        type='multiple'
        defaultValue={['category', 'price', 'color', 'size']}
        className='w-full'
      >
        {/* 1. فلتر الأقسام */}
        <AccordionItem value='category' className='border-none'>
          <AccordionTrigger className='text-sm font-bold hover:no-underline py-3'>
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-3 pt-1'>
              {[
                'Abayas',
                'Hijabs',
                "Men's Wear",
                'Home Wear',
                'Prayer Sets',
                'Accessories',
              ].map((cat) => (
                <div key={cat} className='flex items-center space-x-3'>
                  <Checkbox id={cat} className='rounded-sm' />
                  <Label
                    htmlFor={cat}
                    className='text-sm font-normal cursor-pointer text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className='my-2' />

        {/* 2. فلتر السعر */}
        <AccordionItem value='price' className='border-none'>
          <AccordionTrigger className='text-sm font-bold hover:no-underline py-3'>
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className='pt-4 px-1 space-y-4'>
              <Slider
                defaultValue={[0, 2000]}
                max={5000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
                className='my-4'
              />
              <div className='flex items-center justify-between text-xs font-medium border p-2 rounded-md bg-muted/20'>
                <span>{priceRange[0]} EGP</span>
                <span className='text-muted-foreground'>-</span>
                <span>{priceRange[1]} EGP</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className='my-2' />

        {/* 3. فلتر الألوان */}
        <AccordionItem value='color' className='border-none'>
          <AccordionTrigger className='text-sm font-bold hover:no-underline py-3'>
            Colors
          </AccordionTrigger>
          <AccordionContent>
            <div className='grid grid-cols-5 gap-2 pt-1'>
              {[
                'black',
                'white',
                'navy',
                'beige',
                'maroon',
                'green',
                'gray',
                'brown',
              ].map((color) => (
                <div
                  key={color}
                  className='h-8 w-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform relative flex items-center justify-center group'
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  <div className='absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 opacity-0 hover:opacity-50 transition-opacity' />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className='my-2' />

        {/* 4. فلتر المقاسات */}
        <AccordionItem value='size' className='border-none'>
          <AccordionTrigger className='text-sm font-bold hover:no-underline py-3'>
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className='grid grid-cols-3 gap-2 pt-1'>
              {['S', 'M', 'L', 'XL', 'XXL', 'One Size'].map((size) => (
                <div
                  key={size}
                  className='border rounded-md py-2 text-center text-xs cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all'
                >
                  {size}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
