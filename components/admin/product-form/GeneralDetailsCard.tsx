import { Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  title: string
  description: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export default function GeneralDetailsCard({
  title,
  description,
  onChange,
}: Props) {
  return (
    <Card className='border-gray-200 shadow-xl bg-white rounded-2xl'>
      <CardHeader className='pb-3 pt-4 px-6 border-b border-gray-100'>
        <CardTitle className='text-xl font-bold flex items-center gap-3 text-gray-900'>
          <Tag className='h-5 w-5 text-gray-600' /> General Details
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 px-6 pb-6 pt-5'>
        <div className='space-y-2'>
          <Label
            htmlFor='title'
            className='text-sm font-semibold text-gray-700'
          >
            Title <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='title'
            name='title'
            value={title}
            onChange={onChange}
            placeholder='Product Title'
            className='h-12 text-base border-gray-300 rounded-xl'
          />
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='description'
            className='text-sm font-semibold text-gray-700'
          >
            Description
          </Label>
          <Textarea
            id='description'
            name='description'
            value={description}
            onChange={onChange}
            placeholder='Description...'
            className='min-h-[150px] text-sm border-gray-300 rounded-xl'
          />
        </div>
      </CardContent>
    </Card>
  )
}
