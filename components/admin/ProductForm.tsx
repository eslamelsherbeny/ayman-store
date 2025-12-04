/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Loader2, Save, Undo2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useProductForm } from '@/hooks/useProductForm'
import GeneralDetailsCard from './product-form/GeneralDetailsCard'
import MediaCard from './product-form/MediaCard'
import VariantsCard from './product-form/VariantsCard'
import PricingCard from './product-form/PricingCard'
import OrganizationCard from './product-form/OrganizationCard'

export default function ProductForm({
  initialData,
  isEditing = false,
}: {
  initialData?: any
  isEditing?: boolean
}) {
  const router = useRouter()

  const {
    formData,
    loading,
    fetchingCats,
    categories,
    subCategoriesList,
    finalPriceDisplay,
    viewingImage,
    setViewingImage,
    customColorHex,
    setCustomColorHex,
    handleChange,
    handleNumberChange,
    handleCategoryChange,
    addSubcategory,
    removeSubcategory,
    handleImageCoverChange,
    handleGalleryImageAdd,
    handleGalleryImageRemove,
    toggleVariant,
    addCustomColor,
    handleSubmit,
  } = useProductForm(initialData, isEditing)

  if (fetchingCats)
    return (
      <div className='flex justify-center items-center h-96'>
        <Loader2 className='h-10 w-10 animate-spin text-gray-500' />
      </div>
    )

  return (
    <>
      <div className='flex flex-col gap-8 p-8 max-w-6xl mx-auto w-full'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className='text-sm text-gray-500 mt-1'>
              {isEditing ? 'Update details' : 'Create profile'}
            </p>
          </div>
          <Button
            variant='outline'
            size='lg'
            onClick={() => router.back()}
            className='gap-2'
          >
            <Undo2 className='h-4 w-4' /> Cancel
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='grid lg:grid-cols-3 gap-8 items-start'
        >
          {/* Left Column */}
          <div className='col-span-2 space-y-8'>
            <GeneralDetailsCard
              title={formData.title}
              description={formData.description}
              onChange={handleChange}
            />
            <MediaCard
              imageCover={formData.imageCover}
              images={formData.images}
              onCoverChange={handleImageCoverChange}
              onGalleryAdd={handleGalleryImageAdd}
              onGalleryRemove={handleGalleryImageRemove}
              onViewImage={setViewingImage}
              loading={loading}
            />
          </div>

          {/* Right Column */}
          <div className='space-y-6 sticky top-8'>
            <VariantsCard
              colors={formData.colors}
              sizes={formData.sizes}
              onToggle={toggleVariant}
              customColorHex={customColorHex}
              setCustomColorHex={setCustomColorHex}
              onAddCustomColor={addCustomColor}
            />
            <PricingCard
              price={formData.price}
              discount={formData.discount}
              quantity={formData.quantity}
              finalPrice={finalPriceDisplay}
              onChange={handleNumberChange}
            />
            <OrganizationCard
              categories={categories}
              subCategoriesList={subCategoriesList}
              selectedCategory={formData.category}
              selectedSubcategories={formData.subcategories}
              onCategoryChange={handleCategoryChange}
              onAddSubcategory={addSubcategory}
              onRemoveSubcategory={removeSubcategory}
            />
            <Button
              type='submit'
              className='w-full h-14 text-xl font-extrabold bg-black hover:bg-gray-800 text-white'
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='mr-2 h-6 w-6 animate-spin' />
              ) : (
                <Save className='mr-2 h-6 w-6' />
              )}{' '}
              {isEditing ? 'Save Changes' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>

      {/* Lightbox */}
      {viewingImage && (
        <div
          className='fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4'
          onClick={() => setViewingImage(null)}
        >
          <div className='relative max-w-[90vw] max-h-[90vh]'>
            <img
              src={viewingImage}
              className='max-w-full object-contain rounded-lg'
              onClick={(e) => e.stopPropagation()}
              alt='Preview'
            />
            <button
              onClick={() => setViewingImage(null)}
              className='absolute top-4 right-4 bg-white rounded-full p-2'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
