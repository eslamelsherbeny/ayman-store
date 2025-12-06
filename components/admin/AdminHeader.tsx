import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Menu, Plus, Store } from 'lucide-react'
import Link from 'next/link'

// 🛑 التعديل: إضافة الخاصية onMenuClick
export default function AdminHeader({
  title,
  onMenuClick,
}: {
  title: string
  onMenuClick: () => void
}) {
  return (
    // 🛑 التعديل 1: إضافة sticky, top-0, z-20, و shadow-lg
    <header className='sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 shadow-lg'>
      {/* 🛑 التعديل 2: زر القائمة - يظهر فقط على الشاشات الصغيرة مع دالة onClick */}
      <Button
        variant='ghost'
        size='icon'
        className='lg:hidden'
        onClick={onMenuClick}
      >
        <Menu className='h-5 w-5 text-gray-700' />
      </Button>

      <h1 className='text-lg font-bold tracking-tight text-gray-900 md:text-xl md:ml-0 ml-4'>
        {title}
      </h1>

      <div className='flex items-center gap-3'>
        {/* 🛑 التعديل 3: زر إضافة المنتج */}
        <Link href='/admin/products/add'>
          <Button
            size='icon'
            className='h-9 w-9 bg-black hover:bg-gray-800 shadow-md transition-all'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </Link>

        {/* زر العودة للمتجر */}
        <Link href='/' target='_blank'>
          <Button variant='ghost' size='icon' className='h-9 w-9'>
            <Store className='h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors' />
          </Button>
        </Link>

        {/* زر الإشعارات */}
        <Button variant='ghost' size='icon' className='relative h-9 w-9'>
          <Bell className='h-5 w-5 text-gray-500' />
          <span className='absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white'></span>
        </Button>

        {/* قائمة المستخدم */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-500'>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
