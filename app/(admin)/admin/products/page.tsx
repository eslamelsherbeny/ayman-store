/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  ImageIcon,
  Tag as TagIcon,
  AlertTriangle,
  Eye, // 🆕 أيقونة المعاينة
  ExternalLink, // 🆕 أيقونة صغيرة للتوضيح
} from 'lucide-react'
import { toast } from 'sonner'

import { getProducts, deleteProduct } from '@/services/productService'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Product {
  _id: string
  title: string
  slug: string // 👈 نحتاج الـ slug للرابط العام
  price: number
  priceAfterDiscount?: number
  discount?: number
  category: { name: string } | string | null
  imageCover: string
  quantity: number
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await getProducts()

        const productsArray = response.data?.data || response.data || response

        setProducts(Array.isArray(productsArray) ? productsArray : [])
      } catch (error) {
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const confirmDelete = (product: Product) => {
    setProductToDelete(product)
    setOpenDeleteDialog(true)
  }

  const executeDelete = async () => {
    if (!productToDelete) return
    setIsDeleting(true)
    try {
      await deleteProduct(productToDelete._id)
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id))
      toast.success('Product deleted successfully')
      setOpenDeleteDialog(false)
    } catch (error: any) {
      // ... (نفس كود معالجة الخطأ السابق)
      toast.error('Failed to delete')
    } finally {
      setIsDeleting(false)
      setTimeout(() => setProductToDelete(null), 300)
    }
  }

  const cleanImageUrl = (url: string) => {
    if (!url) return null
    if (url.includes('http://localhost:3000/products/')) {
      return url.replace('http://localhost:3000/products/', '')
    }
    return url
  }

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-50/50'>
        <Loader2 className='h-12 w-12 animate-spin text-primary/80' />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6 p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/30'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Products
          </h1>
          <p className='text-gray-500 mt-1 flex items-center gap-2'>
            Manage your inventory
            <Badge
              variant='secondary'
              className='rounded-full px-2.5 bg-gray-100 text-gray-700 border border-gray-200'
            >
              {products.length} Items
            </Badge>
          </p>
        </div>
        <div className='flex items-center gap-3 w-full md:w-auto'>
          <div className='relative flex-1 md:w-80'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search products...'
              className='pl-10 h-11 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 transition-all rounded-xl'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href='/admin/products/add'>
            <Button className='h-11 px-6 rounded-xl gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-200 transition-all hover:scale-[1.02]'>
              <Plus className='h-4 w-4' /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <Card className='border border-gray-100 shadow-lg shadow-gray-100/50 bg-white overflow-hidden rounded-2xl'>
        <CardContent className='p-0'>
          <Table>
            <TableHeader className='bg-gray-50/50'>
              <TableRow className='border-b border-gray-100 hover:bg-transparent'>
                <TableHead className='w-[450px] py-5 pl-6 font-semibold text-gray-600'>
                  Product Info
                </TableHead>
                <TableHead className='py-5 font-semibold text-gray-600'>
                  Category
                </TableHead>
                <TableHead className='py-5 font-semibold text-gray-600'>
                  Price & Discount
                </TableHead>
                <TableHead className='py-5 font-semibold text-gray-600'>
                  Inventory
                </TableHead>
                <TableHead className='py-5 pr-6 text-right font-semibold text-gray-600'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='h-64 text-center'>
                    {/* Empty State */}
                    <div className='flex flex-col items-center justify-center gap-3 text-gray-400'>
                      <Search className='h-10 w-10 opacity-20' />
                      <p className='text-lg font-medium'>No products found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const originalPrice = product.price || 0
                  const priceAfterDiscount =
                    product.priceAfterDiscount || originalPrice
                  const quantity = product.quantity || 0

                  const hasDiscount = priceAfterDiscount < originalPrice
                  const discountPercent =
                    hasDiscount && originalPrice > 0
                      ? Math.round(
                          ((originalPrice - priceAfterDiscount) /
                            originalPrice) *
                            100
                        )
                      : 0

                  const imageUrl = cleanImageUrl(product.imageCover)

                  return (
                    <TableRow
                      key={product._id}
                      className='group hover:bg-gray-50/60 transition-colors border-b border-gray-50 last:border-0'
                    >
                      {/* 1. Product Info (Clickable -> Go to Edit) */}
                      <TableCell className='pl-6 py-4'>
                        <Link
                          href={`/admin/products/${product._id}`}
                          className='flex items-center gap-4 cursor-pointer group-hover:opacity-100'
                        >
                          <div className='relative h-16 w-16 min-w-[64px] rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm group-hover:shadow-md transition-all'>
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={product.title}
                                className='h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500'
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src =
                                    'https://placehold.co/64x64/png?text=No+Img'
                                }}
                              />
                            ) : (
                              <div className='h-full w-full flex items-center justify-center bg-gray-50'>
                                <ImageIcon className='h-6 w-6 text-gray-300' />
                              </div>
                            )}
                          </div>
                          <div className='flex flex-col gap-1 pr-4'>
                            <span className='font-bold text-gray-900 text-base line-clamp-2 group-hover:text-blue-600 transition-colors'>
                              {product.title || 'Untitled Product'}
                            </span>
                            <span className='text-[10px] text-gray-400 font-mono uppercase'>
                              ID: {product._id?.slice(-6)}
                            </span>
                          </div>
                        </Link>
                      </TableCell>

                      {/* 2. Category */}
                      <TableCell className='py-4'>
                        <div className='flex items-center gap-2'>
                          <div
                            className={`p-1.5 rounded-lg ${
                              product.category
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            <TagIcon className='h-3.5 w-3.5' />
                          </div>
                          <span className='text-sm font-medium text-gray-700 capitalize'>
                            {product.category &&
                            typeof product.category === 'object'
                              ? product.category.name
                              : 'Uncategorized'}
                          </span>
                        </div>
                      </TableCell>

                      {/* 3. Price */}
                      <TableCell className='py-4'>
                        <div className='flex flex-col items-start gap-1'>
                          {hasDiscount ? (
                            <>
                              <span className='text-lg font-bold text-gray-900'>
                                EGP {priceAfterDiscount.toLocaleString('en-US')}
                              </span>
                              <div className='flex items-center gap-2'>
                                <span className='text-xs text-gray-400 line-through decoration-red-300'>
                                  EGP {originalPrice.toLocaleString('en-US')}
                                </span>
                                <Badge
                                  variant='destructive'
                                  className='h-5 px-1.5 text-[10px] bg-red-100 text-red-600 hover:bg-red-200 border-red-100 shadow-none font-bold rounded-md'
                                >
                                  {discountPercent}% OFF
                                </Badge>
                              </div>
                            </>
                          ) : (
                            <span className='text-base font-semibold text-gray-700'>
                              EGP {originalPrice.toLocaleString('en-US')}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* 4. Inventory */}
                      <TableCell className='py-4'>
                        <div className='flex flex-col gap-1.5 w-fit'>
                          {quantity > 0 ? (
                            <div className='flex items-center gap-2'>
                              <span className='relative flex h-2.5 w-2.5'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500'></span>
                              </span>
                              <span className='text-sm font-medium text-emerald-700'>
                                In Stock ({quantity.toLocaleString('en-US')})
                              </span>
                            </div>
                          ) : (
                            <Badge
                              variant='outline'
                              className='w-fit border-red-200 bg-red-50 text-red-600'
                            >
                              Out of Stock
                            </Badge>
                          )}
                          {quantity > 0 && (
                            <div className='w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  quantity < 10
                                    ? 'bg-amber-400'
                                    : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min(quantity, 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* 5. Actions */}
                      <TableCell className='pr-6 py-4 text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          {/* 🆕 زر المعاينة (View) */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link href={`/product/${product.slug}`}>
                                  {/* 👆 تأكد ان مسار صفحة المنتج في المتجر هو /product/slug */}
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    className='h-9 w-9 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors'
                                  >
                                    <Eye className='h-4 w-4' />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>View in Store</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Separator orientation='vertical' className='h-4' />

                          {/* زر التعديل */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link href={`/admin/products/${product._id}`}>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    className='h-9 w-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                  >
                                    <Pencil className='h-4 w-4' />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>Edit Product</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* زر الحذف */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-9 w-9 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                  onClick={() => confirmDelete(product)}
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Dialog (كما هو، تم تحسينه سابقاً) */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className='sm:max-w-[440px] p-6 bg-white rounded-2xl shadow-xl border-0'>
          <AlertDialogHeader className='flex flex-row items-start gap-4 space-y-0'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 sm:h-10 sm:w-10'>
              <AlertTriangle className='h-6 w-6 text-red-600 sm:h-5 sm:w-5' />
            </div>
            <div className='flex flex-col gap-1'>
              <AlertDialogTitle className='text-xl font-bold text-gray-900'>
                Delete product
              </AlertDialogTitle>
              <AlertDialogDescription className='text-gray-500 text-base leading-relaxed'>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          {productToDelete && (
            <div className='mt-6 rounded-xl border border-gray-200 bg-gray-50/50 p-3 flex items-center gap-4'>
              <div className='h-14 w-14 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0 relative'>
                {productToDelete.imageCover ? (
                  <img
                    src={cleanImageUrl(productToDelete.imageCover) || ''}
                    className='h-full w-full object-cover'
                    alt='preview'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full text-gray-300'>
                    <ImageIcon className='h-6 w-6' />
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-0.5 min-w-0'>
                <span className='font-bold text-gray-900 text-sm truncate'>
                  {productToDelete.title}
                </span>
                <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                  <span>
                    EGP{' '}
                    {(
                      productToDelete.priceAfterDiscount ||
                      productToDelete.price
                    ).toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter className='mt-8 gap-3 sm:gap-3 sm:flex-row-reverse'>
            <AlertDialogAction
              onClick={executeDelete}
              className='rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm h-11 px-6 font-semibold text-base flex-1 sm:flex-none justify-center'
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />{' '}
                  <span>Deleting...</span>
                </div>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
            <AlertDialogCancel className='mt-0 rounded-xl border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-900 text-gray-700 font-semibold h-11 px-6 text-base flex-1 sm:flex-none justify-center'>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
