// 'use client'

// import Link from 'next/link'
// import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react'
// import { Separator } from '@/components/ui/separator'
// import { usePathname } from 'next/navigation'

// const navItems = [
//   { href: '/dashboard', icon: User, label: 'Account Overview' },
//   { href: '/dashboard/orders', icon: ShoppingBag, label: 'My Orders' },
//   { href: '/dashboard/addresses', icon: MapPin, label: 'Saved Addresses' },
// ]

// export default function UserDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const pathname = usePathname()

//   return (
//     <div className='container mx-auto px-4 md:px-6 py-10 min-h-screen'>
//       <h1 className='text-3xl font-bold tracking-tight mb-8'>My Dashboard</h1>

//       <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>
//         {/* 1. Sidebar */}
//         <aside className='lg:col-span-1'>
//           <div className='sticky top-24 space-y-4 border border-border p-4 rounded-xl bg-card shadow-sm'>
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-sm font-medium
//                   ${
//                     pathname === item.href ||
//                     (pathname === '/dashboard' && item.href === '/dashboard')
//                       ? 'bg-primary text-primary-foreground shadow-md'
//                       : 'hover:bg-muted text-foreground'
//                   }
//                 `}
//               >
//                 <item.icon className='w-4 h-4' />
//                 {item.label}
//               </Link>
//             ))}

//             <Separator className='my-4' />

//             <button className='w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors'>
//               <LogOut className='w-4 h-4' />
//               Sign Out
//             </button>
//           </div>
//         </aside>

//         {/* 2. Main Content */}
//         <main className='lg:col-span-3'>
//           <div className='bg-card p-6 rounded-xl border border-border shadow-sm min-h-[60vh]'>
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
