import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    title: 'Abayas',
    image:
      'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/women/abayas',
  },
  {
    title: 'Hijabs',
    image:
      'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/women/hijabs',
  },
  {
    title: "Men's Wear",
    image:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/men',
  },
  {
    title: 'Hajj & Umrah',
    image:
      'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/hajj-umrah',
  },
  {
    title: 'Home Wear',
    image:
      'https://images.pexels.com/photos/6776104/pexels-photo-6776104.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/women/home-wear',
  },
  {
    title: 'Accessories',
    image:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '/accessories',
  },
]

export default function CategoryGrid() {
  return (
    <section className='py-12 bg-background'>
      <div className='container'>
        <div className='flex justify-between items-end mb-8'>
          <h2 className='text-2xl font-bold uppercase tracking-tight'>
            Categories
          </h2>
          <Link
            href='/categories'
            className='flex items-center gap-1 text-sm font-medium hover:underline'
          >
            View All <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className='group block relative aspect-[4/3] overflow-hidden bg-muted'
            >
              <img
                src={cat.image}
                alt={cat.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors' />
              <div className='absolute bottom-6 left-6 text-white'>
                <h3 className='text-xl font-bold'>{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
