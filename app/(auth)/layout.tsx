export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // إلغاء grid-cols-2 وجعلها flex لتوسيط المحتوى
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4'>
      {children}
    </div>
  )
}
