/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Loader2, Truck, ShieldCheck, RefreshCw } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { getProductBySlug } from '@/services/productService'
import ProductCard from '@/components/shop/ProductCard'
import ProductGallery from '@/components/shop/product-details/ProductGallery'
import ProductInfo from '@/components/shop/product-details/ProductInfo'
import ProductSelectors from '@/components/shop/product-details/ProductSelectors'

// منتجات وهمية (مؤقتاً)
const relatedProducts = [
  {
    id: '2',
    title: 'Classic White Thobe',
    category: 'Men',
    price: 45.0,
    imageCover:
      'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // ...
]

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const cleanUrl = (url: any) => {
    if (!url || typeof url !== 'string') return '/placeholder.png'
    if (url.includes('http://localhost:3000/products/')) {
      return url.replace('http://localhost:3000/products/', '')
    }
    return url
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getProductBySlug(slug as string)
        setProduct(response.data || response)
      } catch (error) {
        console.error('Failed to fetch product', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchData()
  }, [slug])

  if (loading)
    return (
      <div className='flex h-screen items-center justify-center bg-white'>
        <Loader2 className='h-10 w-10 animate-spin text-gray-900' />
      </div>
    )
  if (!product)
    return (
      <div className='flex h-screen items-center justify-center text-gray-500'>
        Product not found.
      </div>
    )

  const originalPrice = product.price || 0
  const priceAfterDiscount = product.priceAfterDiscount || originalPrice
  const hasDiscount = priceAfterDiscount < originalPrice
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - priceAfterDiscount) / originalPrice) * 100)
    : 0
  const allImages = [product.imageCover, ...(product.images || [])]
    .filter(Boolean)
    .map(cleanUrl)

  return (
    <div className='container mx-auto px-4 md:px-6 py-10'>
      {/* Breadcrumbs */}
      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-8 capitalize'>
        <span>Home</span> / <span>{product.category?.name || 'Shop'}</span> /{' '}
        <span className='text-foreground font-medium'>{product.title}</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
        {/* 1. Gallery */}
        <ProductGallery
          images={allImages}
          title={product.title}
          discountPercent={discountPercent}
          hasDiscount={hasDiscount}
        />

        {/* 2. Details */}
        <div className='flex flex-col gap-6'>
          <ProductInfo
            title={product.title}
            rating={product.ratingsAverage}
            reviews={product.ratingsQuantity}
            inStock={product.quantity > 0}
            price={priceAfterDiscount}
            originalPrice={originalPrice}
            description={product.description}
          />

          <ProductSelectors
            colors={product.colors || []}
            sizes={product.sizes || []}
            maxQuantity={product.quantity}
          />

          {/* Features & Accordion (Static Content) */}
          <div className='grid grid-cols-3 gap-4 pt-6 text-center'>
            <div className='flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg'>
              <Truck className='w-5 h-5 text-primary' />
              <span className='text-xs font-medium'>Free Shipping</span>
            </div>
            <div className='flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg'>
              <ShieldCheck className='w-5 h-5 text-primary' />
              <span className='text-xs font-medium'>Secure Payment</span>
            </div>
            <div className='flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-lg'>
              <RefreshCw className='w-5 h-5 text-primary' />
              <span className='text-xs font-medium'>Easy Returns</span>
            </div>
          </div>

          <Accordion type='single' collapsible className='w-full mt-6'>
            <AccordionItem value='details'>
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>Material: Premium Quality</li>
                  <li>Category: {product.category?.name || 'General'}</li>
                  {product.subcategories?.length > 0 && (
                    <li>
                      Tags:{' '}
                      {product.subcategories.map((s: any) => s.name).join(', ')}
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='shipping'>
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                Free shipping on orders over 1000 EGP. Returns accepted within
                30 days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* 4. Related Products */}
      <div className='pt-10 border-t mt-16'>
        <h2 className='text-2xl font-bold mb-8'>You May Also Like</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {relatedProducts.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              category={p.category}
              price={p.price}
              image={p.imageCover}
              oldPrice={p.oldPrice}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
