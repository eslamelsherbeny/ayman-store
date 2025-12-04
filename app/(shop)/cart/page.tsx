// import Link from 'next/link'
// import { ArrowRight, ShoppingBag } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Separator } from '@/components/ui/separator'
// import CartItem from '@/components/shop/CartItem'

// // بيانات وهمية للسلة (Mock Data)
// const cartItems = [
//   {
//     id: 1,
//     title: 'Premium Embroidered Black Abaya',
//     image:
//       'https://images.pexels.com/photos/9967812/pexels-photo-9967812.jpeg?auto=compress&cs=tinysrgb&w=600',
//     price: 120.0,
//     quantity: 1,
//     size: 'M',
//     color: 'Black',
//   },
//   {
//     id: 3,
//     title: 'Chiffon Hijab Beige',
//     image:
//       'https://images.pexels.com/photos/5418933/pexels-photo-5418933.jpeg?auto=compress&cs=tinysrgb&w=600',
//     price: 12.0,
//     quantity: 2,
//     size: 'One Size',
//     color: 'Beige',
//   },
// ]

// export default function CartPage() {
//   // حساب المجموع (بسيط للتجربة)
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   )
//   const shipping = subtotal > 1000 ? 0 : 50 // شحن مجاني فوق 1000
//   const total = subtotal + shipping

//   return (
//     <div className='container mx-auto px-4 md:px-6 py-10 min-h-[60vh]'>
//       <h1 className='text-3xl font-bold tracking-tight mb-8'>Shopping Cart</h1>

//       {cartItems.length > 0 ? (
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
//           {/* 1. Cart Items List (العمود الأيسر العريض) */}
//           <div className='lg:col-span-2'>
//             <div className='border rounded-lg bg-card shadow-sm p-4 md:p-6'>
//               {cartItems.map((item) => (
//                 <CartItem key={item.id} {...item} />
//               ))}
//             </div>
//           </div>

//           {/* 2. Order Summary (العمود الأيمن الجانبي) */}
//           <div className='lg:col-span-1'>
//             <div className='border rounded-lg bg-card shadow-sm p-6 sticky top-24'>
//               <h2 className='text-lg font-bold mb-4'>Order Summary</h2>

//               <div className='space-y-3 text-sm'>
//                 <div className='flex justify-between'>
//                   <span className='text-muted-foreground'>Subtotal</span>
//                   <span className='font-medium'>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className='flex justify-between'>
//                   <span className='text-muted-foreground'>Shipping</span>
//                   <span className='font-medium'>
//                     {shipping === 0 ? (
//                       <span className='text-green-600'>Free</span>
//                     ) : (
//                       `$${shipping.toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <Separator className='my-4' />

//               <div className='flex justify-between font-bold text-lg mb-6'>
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>

//               <Button size='lg' className='w-full text-base font-bold mb-3'>
//                 Proceed to Checkout
//               </Button>

//               <div className='text-center'>
//                 <Link
//                   href='/products'
//                   className='text-sm text-muted-foreground hover:text-primary underline decoration-dotted'
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Empty Cart State (حالة السلة الفارغة)
//         <div className='flex flex-col items-center justify-center py-12 text-center'>
//           <div className='h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6'>
//             <ShoppingBag className='h-10 w-10 text-muted-foreground' />
//           </div>
//           <h2 className='text-xl font-bold mb-2'>Your cart is empty</h2>
//           <p className='text-muted-foreground mb-8 max-w-sm'>
//             Looks like you haven&apos;t added anything to your cart yet.
//           </p>
//           <Button asChild size='lg'>
//             <Link href='/products'>
//               Start Shopping <ArrowRight className='ml-2 h-4 w-4' />
//             </Link>
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }
