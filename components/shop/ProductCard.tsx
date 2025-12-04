import Link from 'next/link'
import { Heart, Eye, ShoppingBag, ImageIcon } from 'lucide-react' // تأكد من استيراد ImageIcon
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  id?: number | string
  image?: string // جعلناها اختيارية لتجنب الأخطاء
  imageCover?: string // دعمنا هذا الاسم أيضاً
  title: string
  category?: string
  price: number
  oldPrice?: number
}

const ProductCard = ({
  id,
  image,
  imageCover,
  title,
  category = 'General', // قيمة افتراضية
  price,
  oldPrice,
}: ProductCardProps) => {
  // 1. تحديد الصورة المتاحة (سواء كانت image أو imageCover)
  const displayImage = image || imageCover || ''

  // 2. تأمين السعر (لتجنب خطأ toFixed)
  const safePrice = typeof price === 'number' ? price : 0

  return (
    <div className='group relative w-full select-none flex flex-col h-full bg-white dark:bg-zinc-900 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md'>
      {/* 1. منطقة الصورة */}
      <div className='relative w-full aspect-[3/4] overflow-hidden bg-gray-100'>
        <Link href={`/product/${id || '#'}`} className='block h-full w-full'>
          {displayImage ? (
            <img
              src={displayImage}
              alt={title}
              className='h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110'
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-300'>
              <ImageIcon className='w-10 h-10' />
            </div>
          )}
        </Link>

        {/* بادج الخصم */}
        {oldPrice && oldPrice > safePrice && (
          <div className='absolute top-3 left-3'>
            <Badge className='bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-sm shadow-sm'>
              Sale
            </Badge>
          </div>
        )}

        {/* الأيقونات الجانبية */}
        <div className='absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20'>
          <button className='h-9 w-9 rounded-full bg-white hover:bg-black hover:text-white text-black flex items-center justify-center transition-colors shadow-md'>
            <Heart className='h-4 w-4' />
          </button>
          <button className='h-9 w-9 rounded-full bg-white hover:bg-black hover:text-white text-black flex items-center justify-center transition-colors shadow-md'>
            <Eye className='h-4 w-4' />
          </button>
        </div>

        <Link
          href={`/product/${id || '#'}`}
          className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-0'
        />
      </div>

      {/* 2. التفاصيل */}
      <div className='flex flex-col flex-grow p-4'>
        <div className='text-center mb-3'>
          <p className='text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-medium'>
            {category}
          </p>
          <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-1 mb-1'>
            <Link href={`/product/${id || '#'}`}>{title}</Link>
          </h3>
          <div className='flex items-center justify-center gap-2 text-sm'>
            {oldPrice && oldPrice > safePrice && (
              <span className='text-gray-400 line-through decoration-gray-400 text-xs'>
                ${oldPrice.toFixed(2)}
              </span>
            )}
            <span
              className={`font-semibold ${
                oldPrice && oldPrice > safePrice
                  ? 'text-red-600'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {/* ✅ هنا استخدمنا safePrice بدلاً من price المباشرة */}$
              {safePrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className='mt-auto w-full'>
          <Button className='w-full bg-black text-white hover:bg-gray-800 h-10 rounded-full text-xs font-bold tracking-widest gap-2 transition-all duration-300 shadow-md hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-gray-200'>
            <ShoppingBag className='h-4 w-4' />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
