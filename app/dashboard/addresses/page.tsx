import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus, Edit, Trash2, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge' // تم إضافة هذا السطر لإصلاح الخطأ

// بيانات وهمية للعناوين
const mockAddresses = [
  {
    id: 1,
    name: 'Home Address',
    address: '123 Example St, Apt 4B',
    city: 'Cairo',
    zip: '11511',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Office Address',
    address: '45 Business Park, Floor 10',
    city: 'Giza',
    zip: '12555',
    isDefault: false,
  },
]

export default function MyAddressesPage() {
  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold border-b pb-4 mb-6'>Saved Addresses</h2>

      <Button className='mb-6 flex items-center gap-2'>
        <Plus className='w-5 h-5' /> Add New Address
      </Button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {mockAddresses.map((addr) => (
          <div
            key={addr.id}
            className={`border border-border p-5 rounded-xl bg-card shadow-md flex flex-col justify-between ${
              addr.isDefault ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
          >
            <div className='space-y-1'>
              <div className='flex items-center justify-between'>
                <h3 className='font-bold text-lg text-foreground flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-primary' />
                  {addr.name}
                </h3>
                {addr.isDefault && (
                  <Badge className='bg-primary/10 text-primary hover:bg-primary/10'>
                    Default
                  </Badge>
                )}
              </div>
              <p className='text-sm text-muted-foreground pt-2'>
                {addr.address}
              </p>
              <p className='text-sm text-muted-foreground'>
                {addr.city}, {addr.zip}
              </p>
            </div>

            <Separator className='my-4' />

            <div className='flex gap-3'>
              <Button variant='outline' size='sm' className='flex-1 gap-2'>
                <Edit className='w-4 h-4' /> Edit
              </Button>
              {!addr.isDefault && (
                <Button
                  variant='destructive'
                  size='sm'
                  className='flex-1 gap-2'
                >
                  <Trash2 className='w-4 h-4' /> Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
