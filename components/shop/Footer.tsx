import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className='bg-black text-white pt-20 pb-10'>
      {/* التعديل: ضفنا mx-auto هنا */}
      <div className='container mx-auto px-4 md:px-6'>
        {/* ... باقي كود الفوتر زي ما هو ... */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
          <div className='space-y-6'>
            <div className='flex flex-col'>
              <h3 className='text-2xl font-bold tracking-tight text-white'>
                AYMAN BASHIR
              </h3>
              <span className='text-[10px] text-gray-400 tracking-[0.2em] uppercase'>
                Modest & Traditional
              </span>
            </div>
            <p className='text-sm text-gray-400 leading-relaxed'>
              Your premier destination for high-quality modest fashion.
            </p>
            <div className='flex gap-4'>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Facebook className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Instagram className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Twitter className='h-5 w-5' />
              </Link>
            </div>
          </div>
          <div>
            <h3 className='font-bold mb-6 text-sm uppercase tracking-wider'>
              Shop
            </h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li>
                <Link
                  href='/women'
                  className='hover:text-white transition-colors'
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  href='/men'
                  className='hover:text-white transition-colors'
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  href='/sale'
                  className='hover:text-red-400 transition-colors'
                >
                  Sale & Offers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold mb-6 text-sm uppercase tracking-wider'>
              Customer Care
            </h3>
            <ul className='space-y-4 text-sm text-gray-400'>
              <li className='flex items-center gap-3'>
                <Phone className='h-4 w-4' />
                <span>+20 123 456 789</span>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='h-4 w-4' />
                <span>support@aymanstore.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold mb-6 text-sm uppercase tracking-wider'>
              Newsletter
            </h3>
            <div className='flex flex-col gap-3'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='h-11 bg-neutral-900 border-neutral-800 text-white placeholder:text-gray-600 focus:border-white transition-colors'
              />
              <Button className='h-11 w-full bg-white text-black hover:bg-gray-200 font-medium'>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <Separator className='bg-neutral-800 my-8' />
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500'>
          <p>© 2025 Ayman Bashir Store. All rights reserved.</p>
          <div className='flex gap-6'>
            <Link
              href='/privacy'
              className='hover:text-white transition-colors'
            >
              Privacy Policy
            </Link>
            <Link href='/terms' className='hover:text-white transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
