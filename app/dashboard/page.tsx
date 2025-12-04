import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function DashboardOverviewPage() {
  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold border-b pb-4 mb-6'>
        Account Overview
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Card 1: Recent Orders */}
        <div className='border border-border p-4 rounded-lg bg-muted/10 shadow-sm'>
          <h3 className='font-semibold mb-2'>Recent Orders</h3>
          <p className='text-3xl font-bold text-primary'>3</p>
          <p className='text-sm text-muted-foreground mt-2'>
            View your last 3 orders.
          </p>
          <Button variant='link' asChild className='p-0 mt-3 h-auto'>
            <Link href='/dashboard/orders'>
              View Orders <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* Card 2: Saved Addresses */}
        <div className='border border-border p-4 rounded-lg bg-muted/10 shadow-sm'>
          <h3 className='font-semibold mb-2'>Saved Addresses</h3>
          <p className='text-3xl font-bold'>1</p>
          <p className='text-sm text-muted-foreground mt-2'>
            Manage your delivery locations.
          </p>
          <Button variant='link' asChild className='p-0 mt-3 h-auto'>
            <Link href='/dashboard/addresses'>
              Manage Addresses <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* Card 3: Account Info */}
        <div className='border border-border p-4 rounded-lg bg-muted/10 shadow-sm'>
          <h3 className='font-semibold mb-2'>Account Details</h3>
          <p className='text-sm font-medium'>John Doe</p>
          <p className='text-sm text-muted-foreground'>john.doe@example.com</p>
          <Button variant='link' asChild className='p-0 mt-3 h-auto'>
            {/* تم إصلاح الخطأ عبر التأكد من أن Link يحتوي على كل العناصر */}
            <Link href='/dashboard/profile' className='flex items-center'>
              Edit Profile <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
