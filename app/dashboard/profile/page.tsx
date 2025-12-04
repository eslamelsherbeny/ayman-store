// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Separator } from '@/components/ui/separator'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Save } from 'lucide-react'

// export default function UserProfilePage() {
//   return (
//     <div className='space-y-8'>
//       <h2 className='text-2xl font-bold border-b pb-4 mb-6'>
//         Account Settings
//       </h2>

//       <Tabs defaultValue='profile' className='w-full'>
//         {/* Tab Headers */}
//         <TabsList className='grid w-full grid-cols-2 max-w-lg'>
//           <TabsTrigger value='profile' className='text-sm font-semibold'>
//             Profile Information
//           </TabsTrigger>
//           <TabsTrigger value='password' className='text-sm font-semibold'>
//             Change Password
//           </TabsTrigger>
//         </TabsList>

//         {/* Tab 1: Profile Information */}
//         <TabsContent
//           value='profile'
//           className='mt-6 border border-border p-6 rounded-xl bg-card shadow-sm'
//         >
//           <h3 className='text-lg font-bold mb-4'>Personal Details</h3>
//           <p className='text-sm text-muted-foreground mb-6'>
//             Update your name, email address, and phone number.
//           </p>

//           <form className='space-y-6 max-w-lg'>
//             {/* Full Name */}
//             <div className='space-y-2'>
//               <Label htmlFor='fullName'>Full Name</Label>
//               <Input
//                 id='fullName'
//                 placeholder='John Doe'
//                 defaultValue='John Doe'
//                 className='h-10'
//               />
//             </div>

//             {/* Email */}
//             <div className='space-y-2'>
//               <Label htmlFor='email'>Email Address</Label>
//               <Input
//                 id='email'
//                 type='email'
//                 placeholder='john.doe@example.com'
//                 defaultValue='john.doe@example.com'
//                 className='h-10'
//                 disabled
//               />
//               <p className='text-xs text-muted-foreground'>
//                 Email address cannot be changed.
//               </p>
//             </div>

//             {/* Phone */}
//             <div className='space-y-2'>
//               <Label htmlFor='phone'>Phone Number</Label>
//               <Input
//                 id='phone'
//                 placeholder='+20 1xxxxxxxxx'
//                 defaultValue='+20 1234567890'
//                 className='h-10'
//               />
//             </div>

//             <Button
//               type='submit'
//               className='w-full md:w-auto mt-4 flex items-center gap-2'
//             >
//               <Save className='w-5 h-5' /> Save Changes
//             </Button>
//           </form>
//         </TabsContent>

//         {/* Tab 2: Change Password */}
//         <TabsContent
//           value='password'
//           className='mt-6 border border-border p-6 rounded-xl bg-card shadow-sm'
//         >
//           <h3 className='text-lg font-bold mb-4'>Security</h3>
//           <p className='text-sm text-muted-foreground mb-6'>
//             Ensure your account is protected with a strong password.
//           </p>

//           <form className='space-y-6 max-w-lg'>
//             {/* Current Password */}
//             <div className='space-y-2'>
//               <Label htmlFor='currentPassword'>Current Password</Label>
//               <Input
//                 id='currentPassword'
//                 type='password'
//                 placeholder='••••••••'
//                 className='h-10'
//               />
//             </div>

//             <Separator />

//             {/* New Password */}
//             <div className='space-y-2'>
//               <Label htmlFor='newPassword'>New Password</Label>
//               <Input
//                 id='newPassword'
//                 type='password'
//                 placeholder='Enter new password'
//                 className='h-10'
//               />
//             </div>

//             {/* Confirm New Password */}
//             <div className='space-y-2'>
//               <Label htmlFor='confirmPassword'>Confirm New Password</Label>
//               <Input
//                 id='confirmPassword'
//                 type='password'
//                 placeholder='Confirm new password'
//                 className='h-10'
//               />
//             </div>

//             <Button
//               type='submit'
//               variant='destructive'
//               className='w-full md:w-auto mt-4 flex items-center gap-2'
//             >
//               <Save className='w-5 h-5' /> Change Password
//             </Button>
//           </form>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
