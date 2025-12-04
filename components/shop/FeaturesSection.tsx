import { Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react'

const features = [
  {
    icon: <Truck className='h-8 w-8 mb-4 text-primary' />,
    title: 'Free Shipping',
    description: 'On orders over 1000 EGP',
  },
  {
    icon: <ShieldCheck className='h-8 w-8 mb-4 text-primary' />,
    title: 'Secure Payment',
    description: '100% secure payment',
  },
  {
    icon: <RefreshCw className='h-8 w-8 mb-4 text-primary' />,
    title: '30 Days Return',
    description: 'Easy exchange policy',
  },
  {
    icon: <Headset className='h-8 w-8 mb-4 text-primary' />,
    title: '24/7 Support',
    description: 'Ready to help you',
  },
]

export default function FeaturesSection() {
  return (
    <section className='py-16 bg-background border-t border-border'>
      {/* التعديل: ضفنا mx-auto هنا */}
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center p-4'
            >
              {feature.icon}
              <h3 className='font-bold text-lg mb-2'>{feature.title}</h3>
              <p className='text-sm text-muted-foreground'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
