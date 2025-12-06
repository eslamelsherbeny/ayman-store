'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  ShoppingCart,
  Menu,
  Search,
  User,
  Heart,
  Phone,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const BrandLogo = () => (
  <div className='flex items-center gap-3 group cursor-pointer'>
    <div className='w-12 h-12 bg-black text-white flex items-center justify-center rounded-tr-2xl rounded-bl-2xl font-bold text-xl transition-colors shadow-sm'>
      AB
    </div>
    <div className='flex flex-col'>
      <span className='font-extrabold text-xl leading-none tracking-tight'>
        AYMAN BASHIR
      </span>
      <span className='text-[11px] text-muted-foreground tracking-[0.2em] uppercase font-medium'>
        Modest & Traditional
      </span>
    </div>
  </div>
)

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { user, logoutContext } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (user) {
      console.log('👤 بيانات المستخدم الحالية:', user)
    }
  }, [user])

  const isLoggedIn = user && user.token
  const isAdmin = user && user.role === 'admin'

  const mainLinks = [
    { title: 'Home', href: '/' },
    { title: 'Women', href: '/women', isNew: false },
    { title: 'Men', href: '/men', isNew: false },
    { title: 'Sale', href: '/sale', isNew: true },
  ]

  const categories = [
    { name: 'Abayas', href: '/women/abayas' },
    { name: 'Hijabs', href: '/women/hijabs' },
    { name: 'Kaftans', href: '/men/kaftans' },
    { name: 'Galabeyas', href: '/men/galabeyas' },
  ]

  return (
    // 🛑 تم إضافة overflow-x-hidden هنا احتياطياً
    <header className='sticky top-0 z-50 w-full border-b bg-background shadow-md bg-white overflow-x-hidden'>
      {/* شريط الشحن العلوي */}
      <div className='w-full bg-black text-white text-[11px] font-medium py-2'>
        <div className='container mx-auto px-4 md:px-8 flex justify-between items-center h-full'>
          <p className='flex items-center gap-2'>
            <span className='bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold'>
              HOT
            </span>
            Free Shipping on orders over 1000 EGP
          </p>
          <div className='hidden md:flex items-center gap-6 divide-x divide-gray-700/50'>
            <span className='pl-6 flex items-center gap-1'>
              <Phone className='w-3 h-3' /> 19019
            </span>
            <span className='pl-6 cursor-pointer'>Track Order</span>
          </div>
        </div>
      </div>

      {/* الرأس الرئيسي */}
      {/* 🛑 التعديل 1: استخدام justify-between وتوحيد حجم الحاوية (h-20) */}
      <div className='container mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4'>
        {/* المجموعة اليسرى: زر القائمة الجانبية (Mobile Menu Button) واللوجو */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'lg:hidden h-10 w-10'
              )}
            >
              <Menu className='h-6 w-6' />
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px]'>
              <SheetHeader className='mb-6 text-left'>
                <BrandLogo />
              </SheetHeader>
              <div className='flex flex-col gap-6'>
                <nav className='flex flex-col gap-1'>
                  {mainLinks.map((link) => (
                    <SheetClose key={link.title} asChild>
                      <Link
                        href={link.href}
                        className='text-lg font-semibold p-3 hover:bg-slate-100 rounded-lg flex justify-between items-center'
                      >
                        {link.title}
                        {link.isNew && (
                          <Badge
                            variant='destructive'
                            className='text-[10px] h-5 px-1.5'
                          >
                            NEW
                          </Badge>
                        )}
                      </Link>
                    </SheetClose>
                  ))}
                  <Separator className='my-4' />
                  {categories.map((cat) => (
                    <SheetClose key={cat.name} asChild>
                      <Link
                        href={cat.href}
                        className='text-base font-medium p-3 hover:text-primary transition-colors block'
                      >
                        {cat.name}
                      </Link>
                    </SheetClose>
                  ))}

                  {/* Mobile Auth (في ذيل القائمة) */}
                  <div className='mt-4 pt-4 border-t'>
                    {!isLoggedIn ? (
                      <Link
                        href='/login'
                        className={cn(
                          buttonVariants({ variant: 'default' }),
                          'w-full'
                        )}
                      >
                        Login / Register
                      </Link>
                    ) : (
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium px-2'>
                          Hi, {user.name}
                        </p>
                        {isAdmin && (
                          <Link
                            href='/admin'
                            className='flex items-center gap-2 px-2 py-2 text-sm hover:bg-slate-100 rounded-md'
                          >
                            <LayoutDashboard className='h-4 w-4' /> Admin
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logoutContext}
                          className='flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md text-left'
                        >
                          <LogOut className='h-4 w-4' /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href='/' className='flex-shrink-0'>
            <BrandLogo />
          </Link>
        </div>

        {/* روابط الكمبيوتر */}
        <nav className='hidden lg:flex items-center gap-10'>
          {' '}
          {/* 🛑 التعديل: lg:flex للعرض الأكبر فقط */}
          {mainLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className='text-base font-bold tracking-wide hover:text-primary relative group py-2'
            >
              {link.title}
              {link.isNew && (
                <span className='absolute -top-3 -right-4 text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded'>
                  Sale
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* 🛑 التعديل 2: تجميع أيقونات الإجراءات (اليمين) */}
        <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>
          <div className='hidden xl:flex relative w-[200px]'>
            <Input
              type='search'
              placeholder='Search...'
              className='h-10 w-full rounded-full pl-4 pr-10 bg-slate-50'
            />
            <Search className='absolute right-3 top-2.5 h-4 w-4 text-muted-foreground' />
          </div>

          <div className='flex items-center gap-1'>
            <Button
              variant='ghost'
              size='icon'
              className='hidden sm:flex rounded-full h-10 w-10'
            >
              <Heart className='h-6 w-6' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              className='relative rounded-full h-10 w-10'
              asChild
            >
              <Link href='/cart'>
                <ShoppingCart className='h-6 w-6' />
                <span className='absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-white'></span>
              </Link>
            </Button>

            {/* User Dropdown / Login Button */}
            {mounted && !isLoggedIn ? (
              <Button
                variant='ghost'
                size='icon' // 🛑 تم التعديل إلى size='icon'
                className='flex items-center gap-2 font-bold h-10 w-10'
                asChild
              >
                <Link href='/login'>
                  <User className='h-6 w-6' />
                  {/* <span className='hidden sm:inline'>Login</span> 🛑 تم إزالة النص على الهاتف */}
                </Link>
              </Button>
            ) : (
              mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='rounded-full h-10 w-10'
                    >
                      <User className='h-6 w-6' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    {/* ... (محتوى Dropdown) ... */}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
