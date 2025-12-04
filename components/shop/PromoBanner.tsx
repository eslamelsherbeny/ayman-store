import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PromoBanner() {
  return (
    <section className='py-10 bg-black text-white my-6 w-full'>
      {/* التعديل الجذري هنا: */}
      {/* 1. mx-auto: تجبر الحاوية نفسها تكون في نص الشاشة بالظبط */}
      {/* 2. justify-center: تأكيد إضافي لتوسط العناصر */}
      <div className='container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center'>
        <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-3'>
          Ramadan Sale
        </h2>

        <p className='text-gray-300 max-w-lg mx-auto mb-6 text-base md:text-lg'>
          Get up to 40% off on our exclusive traditional collection. Limited
          time offer.
        </p>

        <Button
          asChild
          size='default'
          className='bg-white text-black hover:bg-gray-200 px-8'
        >
          <Link href='/sale'>Discover Offers</Link>
        </Button>
      </div>
    </section>
  )
}
