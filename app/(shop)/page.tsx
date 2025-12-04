'use client'
import HeroSlider from '@/components/shop/HeroSlider'
import CategoryGrid from '@/components/shop/CategoryGrid'
import FlashSale from '@/components/shop/FlashSale'
import BestSellers from '@/components/shop/BestSellers'
import PromoBanner from '@/components/shop/PromoBanner'
import TrendingCarousel from '@/components/shop/TrendingCarousel'
import FeaturesSection from '@/components/shop/FeaturesSection'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { user, isAuthenticated } = useAuth()
  return (
    <div className='flex flex-col gap-0'>
      <main>
        {/* 1. البانر الرئيسي المتحرك */}
        <HeroSlider />
        {/* <div>
          <h1>Auth Test</h1>
          <p>Logged: {isAuthenticated ? 'YES' : 'NO'}</p>
          <p>User: {JSON.stringify(user)}</p>
        </div> */}

        {/* 2. شبكة الأقسام (عشان العميل يختار هو رايح فين) */}
        <CategoryGrid />

        {/* 3. العروض المؤقتة (لجذب الانتباه) */}
        <FlashSale />

        {/* 4. الأكثر مبيعاً (لزيادة الثقة) */}
        <BestSellers />

        {/* 5. فاصل إعلاني (رمضان سيل) */}
        <PromoBanner />

        {/* 6. المنتجات الرائجة (سلايدر متحرك) */}
        <TrendingCarousel />

        {/* 7. مميزات المتجر (شحن، دفع.. مكانها قبل الفوتر) */}
        <FeaturesSection />
      </main>
    </div>
  )
}
