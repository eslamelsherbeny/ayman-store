// import { SlidersHorizontal, ChevronDown } from 'lucide-react'
// import ProductCard from '@/components/shop/ProductCard'
// import FilterSidebar from '@/components/shop/FilterSidebar'
// import { Button } from '@/components/ui/button'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

// // بيانات وهمية للمنتجات (Mock Data)
// const allProducts = [
//   {
//     id: 1,
//     title: 'Premium Black Abaya',
//     category: 'Abayas',
//     price: 85.0,
//     image:
//       'https://images.pexels.com/photos/8113702/pexels-photo-8113702.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 2,
//     title: 'Classic White Thobe',
//     category: 'Men',
//     price: 45.0,
//     image:
//       'https://images.pexels.com/photos/7244589/pexels-photo-7244589.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 3,
//     title: 'Chiffon Hijab Beige',
//     category: 'Scarves',
//     price: 12.0,
//     image:
//       'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 4,
//     title: 'Prayer Set Complete',
//     category: 'Accessories',
//     price: 35.0,
//     image:
//       'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 5,
//     title: 'Luxury Kaftan',
//     category: 'Sale',
//     price: 150.0,
//     oldPrice: 200.0,
//     image:
//       'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 6,
//     title: 'Casual Home Set',
//     category: 'Home Wear',
//     price: 60.0,
//     image:
//       'https://images.pexels.com/photos/6776104/pexels-photo-6776104.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 7,
//     title: 'Leather Sandals',
//     category: 'Men',
//     price: 40.0,
//     image:
//       'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 8,
//     title: 'Embroidered Scarf',
//     category: 'Scarves',
//     price: 18.0,
//     image:
//       'https://images.pexels.com/photos/4246231/pexels-photo-4246231.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
// ]

// export default function ProductsPage() {
//   return (
//     <div className='container mx-auto px-4 md:px-6 py-8'>
//       {/* 1. Header (العنوان وأدوات التحكم) */}
//       <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-6'>
//         <div>
//           <h1 className='text-3xl font-bold tracking-tight mb-2'>
//             All Products
//           </h1>
//           <p className='text-sm text-muted-foreground'>
//             Showing 1–8 of 32 results
//           </p>
//         </div>

//         <div className='flex items-center gap-2 w-full md:w-auto'>
//           {/* زر الفلتر (يظهر فقط في الموبايل) */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant='outline' className='lg:hidden flex-1 gap-2'>
//                 <SlidersHorizontal className='h-4 w-4' /> Filters
//               </Button>
//             </SheetTrigger>
//             <SheetContent side='left' className='w-[300px] overflow-y-auto'>
//               <FilterSidebar />
//             </SheetContent>
//           </Sheet>

//           {/* زر الترتيب (Sort) */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant='outline'
//                 className='flex-1 md:w-[180px] justify-between'
//               >
//                 Sort by: Featured <ChevronDown className='h-4 w-4 opacity-50' />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align='end'>
//               <DropdownMenuItem>Featured</DropdownMenuItem>
//               <DropdownMenuItem>Newest Arrivals</DropdownMenuItem>
//               <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
//               <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* 2. Layout (الشبكة الرئيسية) */}
//       <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>
//         {/* Sidebar (Desktop Only) */}
//         <aside className='hidden lg:block lg:col-span-1 sticky top-24 h-fit'>
//           <FilterSidebar />
//         </aside>

//         {/* Product Grid */}
//         <div className='lg:col-span-3'>
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//             {allProducts.map((product) => (
//               <ProductCard key={product.id} {...product} />
//             ))}
//           </div>

//           {/* Pagination (Load More) */}
//           <div className='mt-12 text-center'>
//             <Button variant='outline' size='lg' className='min-w-[200px]'>
//               Load More Products
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
