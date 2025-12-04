import Navbar from '@/components/shop/Navbar'
import Footer from '@/components/shop/Footer'
import { AuthProvider } from '@/context/AuthContext' // استيراد Context

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // تغليف الموقع بـ AuthProvider
    <AuthProvider>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        {/* القائمة الثابتة */}
        <main className='flex-1'>{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
