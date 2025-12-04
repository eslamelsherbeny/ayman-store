// import Link from 'next/link'
// import {
//   ArrowLeft,
//   ArrowRight,
//   Wallet,
//   MapPin,
//   Package,
//   CreditCard,
//   CheckCircle,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Separator } from '@/components/ui/separator'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// // بيانات وهمية (Mock Data)
// const orderSummary = {
//   items: [
//     { id: 1, title: 'Black Abaya', price: 120.0, quantity: 1 },
//     { id: 2, title: 'White Thobe', price: 45.0, quantity: 1 },
//   ],
//   subtotal: 165.0,
//   shippingCost: 50.0,
//   total: 215.0,
// }

// export default function CheckoutPage() {
//   return (
//     <div className='container mx-auto px-4 md:px-6 py-10'>
//       <Link
//         href='/cart'
//         className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6'
//       >
//         <ArrowLeft className='h-4 w-4' /> Back to Cart
//       </Link>

//       <h1 className='text-3xl font-bold tracking-tight mb-8'>Checkout</h1>

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
//         {/* 1. Shipping and Payment Details (العمود الأيسر العريض) */}
//         <div className='lg:col-span-2 space-y-10'>
//           {/* Section 1: Shipping Address */}
//           <div className='space-y-6 border border-border p-6 rounded-lg bg-card shadow-sm'>
//             <h2 className='text-xl font-bold flex items-center gap-3'>
//               <MapPin className='h-5 w-5 text-primary' /> 1. Shipping Address
//             </h2>
//             <Separator />
//             <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <div className='space-y-2'>
//                 <Label htmlFor='firstName'>First Name</Label>
//                 <Input id='firstName' placeholder='John' className='h-10' />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='lastName'>Last Name</Label>
//                 <Input id='lastName' placeholder='Doe' className='h-10' />
//               </div>
//               <div className='space-y-2 md:col-span-2'>
//                 <Label htmlFor='address'>Street Address</Label>
//                 <Input
//                   id='address'
//                   placeholder='123 Example Street'
//                   className='h-10'
//                 />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='city'>City</Label>
//                 <Input id='city' placeholder='Cairo' className='h-10' />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='zip'>Zip Code</Label>
//                 <Input id='zip' placeholder='11511' className='h-10' />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='phone'>Phone Number</Label>
//                 <Input
//                   id='phone'
//                   placeholder='+20 1xxxxxxxxx'
//                   className='h-10'
//                 />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='country'>Country</Label>
//                 <Select>
//                   <SelectTrigger className='h-10'>
//                     <SelectValue placeholder='Select Country' />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value='egypt'>Egypt</SelectItem>
//                     <SelectItem value='ksa'>KSA</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </form>
//           </div>

//           {/* Section 2: Delivery Options */}
//           <div className='space-y-6 border border-border p-6 rounded-lg bg-card shadow-sm'>
//             <h2 className='text-xl font-bold flex items-center gap-3'>
//               <Package className='h-5 w-5 text-primary' /> 2. Delivery Options
//             </h2>
//             <Separator />
//             <RadioGroup
//               defaultValue='standard'
//               className='grid grid-cols-1 md:grid-cols-2 gap-4'
//             >
//               <div className='flex items-center justify-between border rounded-lg p-4 bg-muted/10'>
//                 <Label
//                   htmlFor='standard'
//                   className='font-semibold cursor-pointer'
//                 >
//                   Standard Shipping
//                   <p className='text-xs font-normal text-muted-foreground mt-1'>
//                     3-5 Business Days
//                   </p>
//                 </Label>
//                 <div className='flex items-center gap-2'>
//                   <span className='font-bold text-sm'>$50</span>
//                   <RadioGroupItem
//                     value='standard'
//                     id='standard'
//                     className='h-5 w-5'
//                   />
//                 </div>
//               </div>
//               <div className='flex items-center justify-between border rounded-lg p-4 bg-muted/10'>
//                 <Label
//                   htmlFor='express'
//                   className='font-semibold cursor-pointer'
//                 >
//                   Express Delivery
//                   <p className='text-xs font-normal text-muted-foreground mt-1'>
//                     1-2 Business Days
//                   </p>
//                 </Label>
//                 <div className='flex items-center gap-2'>
//                   <span className='font-bold text-sm'>$150</span>
//                   <RadioGroupItem
//                     value='express'
//                     id='express'
//                     className='h-5 w-5'
//                   />
//                 </div>
//               </div>
//             </RadioGroup>
//           </div>

//           {/* Section 3: Payment Method */}
//           <div className='space-y-6 border border-border p-6 rounded-lg bg-card shadow-sm'>
//             <h2 className='text-xl font-bold flex items-center gap-3'>
//               <CreditCard className='h-5 w-5 text-primary' /> 3. Payment Method
//             </h2>
//             <Separator />
//             <RadioGroup defaultValue='cash' className='space-y-3'>
//               <div className='flex items-center justify-between border rounded-lg p-4'>
//                 <Label
//                   htmlFor='cash'
//                   className='font-semibold cursor-pointer flex items-center gap-3'
//                 >
//                   <Wallet className='h-5 w-5' />
//                   Cash On Delivery (COD)
//                 </Label>
//                 <RadioGroupItem value='cash' id='cash' className='h-5 w-5' />
//               </div>
//               <div className='flex items-center justify-between border rounded-lg p-4'>
//                 <Label
//                   htmlFor='card'
//                   className='font-semibold cursor-pointer flex items-center gap-3'
//                 >
//                   <CreditCard className='h-5 w-5' />
//                   Credit / Debit Card
//                 </Label>
//                 <RadioGroupItem value='card' id='card' className='h-5 w-5' />
//               </div>
//             </RadioGroup>
//           </div>
//         </div>

//         {/* 2. Order Summary (العمود الأيمن الجانبي) */}
//         <div className='lg:col-span-1'>
//           <div className='border rounded-lg bg-card shadow-lg p-6 sticky top-24'>
//             <h2 className='text-lg font-bold mb-4'>Order Review</h2>

//             <div className='space-y-3 text-sm border-b border-border pb-4'>
//               {orderSummary.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className='flex justify-between text-muted-foreground'
//                 >
//                   <span className='line-clamp-1'>
//                     {item.title} ({item.quantity}x)
//                   </span>
//                   <span>${(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>

//             <div className='space-y-3 text-sm pt-4'>
//               <div className='flex justify-between'>
//                 <span className='text-muted-foreground'>Subtotal</span>
//                 <span className='font-medium'>
//                   ${orderSummary.subtotal.toFixed(2)}
//                 </span>
//               </div>
//               <div className='flex justify-between'>
//                 <span className='text-muted-foreground'>Shipping</span>
//                 <span className='font-medium'>
//                   ${orderSummary.shippingCost.toFixed(2)}
//                 </span>
//               </div>
//             </div>

//             <Separator className='my-4' />

//             <div className='flex justify-between font-bold text-xl mb-6'>
//               <span>Order Total</span>
//               <span>${orderSummary.total.toFixed(2)}</span>
//             </div>

//             <Button
//               size='lg'
//               className='w-full text-base font-bold mb-3 bg-primary hover:bg-primary/90 text-primary-foreground'
//             >
//               <CheckCircle className='w-5 h-5 mr-2' /> Place Order
//             </Button>

//             <p className='text-xs text-muted-foreground text-center mt-3'>
//               By placing the order, you agree to our Terms and Conditions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
