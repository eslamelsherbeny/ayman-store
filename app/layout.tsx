import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shop/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/AuthContext' // 👈 استيراد المزود

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ayman Bashir Store',
  description: 'Best E-commerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {/* 👇 هنا أهم خطوة: لفّ كل الموقع بالـ AuthProvider */}
          <AuthProvider>{children}</AuthProvider>
          <Toaster
            richColors
            position='bottom-right'
            closeButton
            toastOptions={{
              style: { fontSize: '16px', padding: '16px' }, // تكبير الخط والمسافات
              className: 'font-bold', // خط عريض
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
