import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    id: 1,
    title: 'Classic White T-Shirt',
    category: "Men's Wear",
    price: 29.99,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Black Abaya Modern',
    category: 'Abayas',
    price: 89.0,
    oldPrice: 120.0,
    image:
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Beige Hijab',
    category: 'Scarves',
    price: 15.5,
    image:
      'https://images.unsplash.com/photo-1585854468962-4467d1ceb22c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Traditional Thobe',
    category: "Men's Wear",
    price: 55.0,
    oldPrice: 75.0,
    image:
      'https://images.unsplash.com/photo-1560205001-a7011989f676?w=500&auto=format&fit=crop&q=60',
  },
]

export default function FeaturedProducts() {
  return (
    <section className='py-16 bg-white'>
      <div className='container px-4 md:px-6'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>
              Featured Products
            </h2>
            <p className='text-muted-foreground mt-2'>
              Check out what's new this week
            </p>
          </div>
          <Button variant='ghost' className='hidden md:flex gap-2'>
            View All <ArrowRight className='h-4 w-4' />
          </Button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
        <div className='mt-8 flex justify-center md:hidden'>
          <Button variant='outline' className='w-full gap-2'>
            View All Products <ArrowRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </section>
  )
}
