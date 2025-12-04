'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  LineChart,
  Shirt,
  Layers,
  Store, // 👈 تم إضافة أيقونة المتجر
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminSidebar() {
  const pathname = usePathname()

  // دالة مساعدة لتحديد الرابط النشط
  const isActive = (path: string) => pathname === path

  return (
    <div className='hidden border-r bg-white w-[280px] min-h-screen lg:flex flex-col font-sans'>
      {/* 1. Header Area */}
      <div className='h-20 flex items-center px-6 border-b border-gray-100'>
        <Link href='/admin' className='flex items-center gap-3 group'>
          <div className='w-10 h-10 bg-black text-white flex items-center justify-center rounded-xl font-bold text-lg shadow-lg group-hover:scale-105 transition-transform'>
            AB
          </div>
          <div className='flex flex-col'>
            <span className='font-bold text-sm tracking-wide text-gray-900'>
              AYMAN BASHIR
            </span>
            <span className='text-[10px] font-medium text-gray-400 uppercase tracking-widest'>
              Store Admin
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation */}
      <div className='flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1'>
        {/* 👇👇 الرابط الجديد للعودة للمتجر الرئيسي 👇👇 */}
        <Link
          href='/'
          className='flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 shadow-md mb-4'
        >
          <Store className='h-5 w-5' />
          View Store
        </Link>
        {/* 👆👆 نهاية الرابط الجديد 👆👆 */}

        <p className='px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2'>
          Overview
        </p>

        <Link
          href='/admin'
          className={cn(
            'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
            isActive('/admin')
              ? 'bg-gray-900 text-white shadow-md'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          )}
        >
          <LayoutDashboard className='h-5 w-5' />
          Dashboard
        </Link>

        <Link
          href='/admin/orders'
          className={cn(
            'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
            isActive('/admin/orders')
              ? 'bg-gray-900 text-white shadow-md'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          )}
        >
          <ShoppingCart className='h-5 w-5' />
          Orders
          <span className='ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold'>
            3
          </span>
        </Link>

        <p className='px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6'>
          Catalog
        </p>

        {/* Products Menu */}
        <Accordion type='single' collapsible className='w-full space-y-1'>
          <AccordionItem value='products' className='border-none'>
            <AccordionTrigger className='flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:no-underline data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900'>
              <div className='flex items-center gap-3'>
                <Shirt className='h-5 w-5' />
                <span>Products</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='pl-12 pt-1 pb-2 space-y-1'>
              <Link
                href='/admin/products'
                className='block py-2 text-sm text-gray-500 hover:text-primary transition-colors'
              >
                All Products
              </Link>
              <Link
                href='/admin/products/add'
                className='block py-2 text-sm text-gray-500 hover:text-primary transition-colors'
              >
                Add New Product
              </Link>
            </AccordionContent>
          </AccordionItem>

          {/* Categories Menu */}
          <AccordionItem value='categories' className='border-none'>
            <AccordionTrigger className='flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:no-underline data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900'>
              <div className='flex items-center gap-3'>
                <Layers className='h-5 w-5' />
                <span>Categories</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='pl-12 pt-1 pb-2 space-y-1'>
              <Link
                href='/admin/categories/add'
                className='flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-primary transition-colors'
              >
                Main Categories
              </Link>
              <Link
                href='/admin/subcategories/add'
                className='flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-primary transition-colors'
              >
                Sub Categories
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className='px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6'>
          Management
        </p>

        <Link
          href='/admin/customers'
          className='flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all'
        >
          <Users className='h-5 w-5' />
          Customers
        </Link>

        <Link
          href='/admin/settings'
          className='flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all'
        >
          <Settings className='h-5 w-5' />
          Settings
        </Link>
      </div>

      {/* 3. User Profile Footer */}
      <div className='p-4 border-t border-gray-100'>
        <div className='flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100'>
          <Avatar className='h-9 w-9 border-2 border-white shadow-sm'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className='flex flex-col overflow-hidden'>
            <span className='text-sm font-bold text-gray-900 truncate'>
              Admin User
            </span>
            <span className='text-[10px] text-gray-500 truncate'>
              admin@store.com
            </span>
          </div>
          <button className='ml-auto text-gray-400 hover:text-red-500 transition-colors'>
            <LogOut className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}
