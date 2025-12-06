'use client'
import React, { useState } from 'react' // 👈 استيراد useState
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader' // 👈 افتراض استيراد AdminHeader

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 1. تعريف حالة التحكم بالشريط الجانبي للجوال
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 2. دالة لفتح/إغلاق الشريط الجانبي
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <div className='flex min-h-screen bg-gray-50/50'>
      {/* 👈 القائمة الجانبية (تمرير الحالة ودالة الإغلاق) */}
      <AdminSidebar
        isMobileOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
      />

      {/* المحتوى المتغير */}
      <div className='flex-1 flex flex-col'>
        {/* 👈 الرأس (تمرير دالة الفتح) */}
        {/* يُفترض أن AdminHeader الآن يستقبل خاصية onMenuClick */}
        {/* (إذا كان AdminHeader لا يستقبل title، يرجى إزالة الخاصية) */}
        <AdminHeader title='Dashboard' onMenuClick={toggleMobileMenu} />

        <main className='flex-1'>{children}</main>
      </div>

      {/* 🛑 إذا كانت القائمة مفتوحة، نضع خلفية Overlay لإغلاقها بالضغط عليها */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  )
}
