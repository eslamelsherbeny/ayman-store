import ProductCard from './ProductCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const trendingProducts = [
  {
    id: 1,
    title: 'Silk Hijab Set',
    category: 'Trending',
    price: 40.0,
    image:
      'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Luxury Abaya Gold',
    category: 'Trending',
    price: 150.0,
    image:
      'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: "Men's Set White",
    category: 'Trending',
    price: 70.0,
    image:
      'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Evening Dress',
    category: 'Trending',
    price: 110.0,
    image:
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    title: 'Casual Tunic',
    category: 'Daily',
    price: 35.0,
    image:
      'https://images.pexels.com/photos/6776104/pexels-photo-6776104.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export default function TrendingCarousel() {
  return (
    <section className='py-16 bg-muted/20'>
      {/* التعديل: ضفنا mx-auto هنا */}
      <div className='container mx-auto px-4 md:px-6'>
        <h2 className='text-2xl font-bold mb-8 text-foreground'>
          Trending Now
        </h2>
        <Carousel opts={{ align: 'start', loop: true }} className='w-full'>
          <CarouselContent className='-ml-4'>
            {trendingProducts.map((p) => (
              <CarouselItem
                key={p.id}
                className='pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <ProductCard {...p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='hidden md:block'>
            <CarouselPrevious className='border-primary text-primary hover:bg-primary hover:text-white' />
            <CarouselNext className='border-primary text-primary hover:bg-primary hover:text-white' />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
