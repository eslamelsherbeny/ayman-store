'use client'

import HeroSlider from '@/components/shop/HeroSlider'
import CategoryGrid from '@/components/shop/CategoryGrid'
import FlashSale from '@/components/shop/FlashSale'
import BestSellers from '@/components/shop/BestSellers'
import PromoBanner from '@/components/shop/PromoBanner'
import TopRated from '@/components/shop/TopRated'
import FeaturesSection from '@/components/shop/FeaturesSection'
// import { useAuth } from '@/context/AuthContext' // يمكن تفعيلها لاحقاً لو احتجت بيانات المستخدم

export default function Home() {
  // const { user } = useAuth()

  return (
    <div className='flex flex-col gap-0 min-h-screen'>
      <main>
        {/* 1. البانر الرئيسي المتحرك (Hero) */}
        <HeroSlider />

        {/* 2. شبكة الأقسام (Categories) */}
        <CategoryGrid />

        {/* 3. العروض المؤقتة (Flash Sale) */}
        <FlashSale />

        {/* 4. الأكثر مبيعاً (Best Sellers) */}
        <BestSellers />

        {/* 5. فاصل إعلاني مميز (Promo Banner) */}
        {/* يمكنك تغيير الصورة والنصوص هنا بسهولة */}
        <PromoBanner
          badge='New Collection'
          title="Ramadan <span class='text-primary'>Kareem</span> 2025"
          description='Elevate your style this holy month with our exclusive modest wear collection. Designed for elegance and comfort.'
          image='https://images.pexels.com/photos/9726508/pexels-photo-9726508.jpeg?auto=compress&cs=tinysrgb&w=1200'
          link='/products?category=ramadan'
        />

        {/* 6. المنتجات الأعلى تقييماً (Top Rated) - بديل الـ Trending */}
        <TopRated />

        {/* 7. مميزات المتجر (Features) */}
        <FeaturesSection />
      </main>
    </div>
  )
}
