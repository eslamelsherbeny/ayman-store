import AdminHeader from '@/components/admin/AdminHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DollarSign, Users, ShoppingBag, Activity } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader title='Dashboard Overview' />

      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        {/* 1. Stats Cards Section */}
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$45,231.89</div>
              <p className='text-xs text-muted-foreground mt-1 text-green-600 font-medium'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Orders
              </CardTitle>
              <ShoppingBag className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+2350</div>
              <p className='text-xs text-muted-foreground mt-1 text-green-600 font-medium'>
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Customers
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12,234</div>
              <p className='text-xs text-muted-foreground mt-1 text-green-600 font-medium'>
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Active Now
              </CardTitle>
              <Activity className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground mt-1 text-green-600 font-medium'>
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 2. Recent Sales Table */}
        <div className='grid gap-4 md:gap-8 lg:grid-cols-3'>
          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className='hidden md:table-cell'>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* مثال 1 */}
                  <TableRow>
                    <TableCell className='font-medium'>#ORD-001</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src='/avatars/01.png' />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium'>John Doe</span>
                          <span className='text-xs text-muted-foreground'>
                            john@example.com
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2025-12-02
                    </TableCell>
                    <TableCell>
                      <Badge className='bg-green-500 hover:bg-green-600'>
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>

                  {/* مثال 2 */}
                  <TableRow>
                    <TableCell className='font-medium'>#ORD-002</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium'>
                            Ahmed Mohamed
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            ahmed@example.com
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2025-12-01
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className='text-yellow-600 border-yellow-600'
                      >
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>$120.50</TableCell>
                  </TableRow>

                  {/* مثال 3 */}
                  <TableRow>
                    <TableCell className='font-medium'>#ORD-003</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarFallback>SK</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium'>
                            Sara Kamel
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            sara@example.com
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2025-11-28
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary'>Processing</Badge>
                    </TableCell>
                    <TableCell className='text-right'>$85.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
