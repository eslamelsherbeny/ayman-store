import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    id: 1,
    title: 'Premium Black Abaya',
    category: 'Abayas',
    price: 85.0,
    image:
      'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Classic White Thobe',
    category: "Men's Wear",
    price: 45.0,
    image:
      'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Chiffon Hijab Beige',
    category: 'Scarves',
    price: 12.0,
    image:
      'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Prayer Set Complete',
    category: 'Accessories',
    price: 35.0,
    image:
      'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export default function BestSellers() {
  return (
    <section className='py-16 bg-background'>
      {/* التعديل: ضفنا mx-auto هنا */}
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground'>
            Best Sellers
          </h2>
          <Button variant='link' className='hidden md:flex gap-2 text-primary'>
            View All <ArrowRight className='h-4 w-4' />
          </Button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
