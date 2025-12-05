import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  CheckCircle,
  Package,
  XCircle,
  ChevronRight,
} from 'lucide-react'

// بيانات وهمية للطلبات
const mockOrders = [
  {
    id: 'AB100234',
    date: 'Oct 15, 2025',
    total: 350.0,
    status: 'Delivered',
    statusIcon: CheckCircle,
    itemsCount: 3,
  },
  {
    id: 'AB100233',
    date: 'Sep 28, 2025',
    total: 120.0,
    status: 'Shipped',
    statusIcon: Package,
    itemsCount: 1,
  },
  {
    id: 'AB100232',
    date: 'Sep 01, 2025',
    total: 55.0,
    status: 'Cancelled',
    statusIcon: XCircle,
    itemsCount: 1,
  },
]

export default function MyOrdersPage() {
  const getStatusColor = (status: string) => {
    if (status === 'Delivered')
      return 'bg-green-100 text-green-700 hover:bg-green-100'
    if (status === 'Shipped')
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100'
    return 'bg-red-100 text-red-700 hover:bg-red-100'
  }

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold border-b pb-4 mb-6'>My Orders</h2>

      <div className='space-y-4'>
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className='border border-border p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center bg-card shadow-sm'
          >
            {/* Details */}
            <div className='space-y-2 md:space-y-0 md:space-x-8 flex flex-col md:flex-row'>
              <div className='text-sm'>
                <p className='text-muted-foreground'>Order ID</p>
                <p className='font-bold text-foreground'>#{order.id}</p>
              </div>
              <div className='text-sm'>
                <p className='text-muted-foreground'>Date Placed</p>
                <p className='font-bold text-foreground'>{order.date}</p>
              </div>
              <div className='text-sm'>
                <p className='text-muted-foreground'>Total</p>
                <p className='font-bold text-lg text-primary'>
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Status & Action */}
            <div className='flex items-center gap-4 mt-4 md:mt-0'>
              <Badge
                className={`text-xs font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                <order.statusIcon className='w-3 h-3 mr-1' />
                {order.status}
              </Badge>
              <Button variant='outline' size='sm' className='rounded-full'>
                View Details <ChevronRight className='w-4 h-4 ml-1' />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className='text-sm text-center text-muted-foreground pt-4'>
        Showing {mockOrders.length} orders
      </p>
    </div>
  )
}
