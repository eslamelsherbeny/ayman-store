/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { register } from '@/services/authService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const authContext = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirm ||
      !formData.phone
    ) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      const res = await register(formData)

      const userData = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        token: res.token,
        role: res.data.role,
      }

      authContext.loginContext(userData)
      toast.success(`Welcome, ${userData.name}!`)
      router.push('/')
    } catch (err: any) {
      console.error(err)
      const errorMsg =
        err.response?.data?.message || err.message || 'Registration failed'
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4'>
      {/* 👈 العرض الموسع: max-w-3xl */}
      <div className='w-full max-w-3xl space-y-8 bg-white p-12 rounded-2xl shadow-2xl border border-gray-100'>
        <Link
          href='/'
          className='flex items-center gap-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-100 p-2 rounded-lg w-fit transition-colors'
        >
          <ArrowLeft className='h-5 w-5' /> Back to Store
        </Link>

        <div className='text-center'>
          <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
            Create Your Account
          </h1>
          <p className='mt-2 text-base text-gray-500'>
            Enter your personal details below to register
          </p>
        </div>

        {/* 👈 تم إلغاء جميع تخطيطات Grid. كل حقل في صف مستقل (W-full) */}
        <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
          {/* 1. Full Name (صف مستقل) */}
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-sm font-medium text-gray-700'>
              Full Name
            </Label>
            <Input
              id='name'
              name='name'
              placeholder='John Doe'
              className='h-11 border-gray-300 focus:border-black'
              onChange={handleChange}
            />
          </div>

          {/* 2. Phone Number (صف مستقل) */}
          <div className='space-y-2'>
            <Label
              htmlFor='phone'
              className='text-sm font-medium text-gray-700'
            >
              Phone Number
            </Label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              placeholder='010xxxxxxxxx'
              className='h-11 border-gray-300 focus:border-black'
              onChange={handleChange}
            />
          </div>

          {/* 3. Email address (صف مستقل) */}
          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='text-sm font-medium text-gray-700'
            >
              Email address
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='name@example.com'
              className='h-11 border-gray-300 focus:border-black'
              onChange={handleChange}
            />
          </div>

          {/* 4. Password (صف مستقل) */}
          <div className='space-y-2'>
            <Label
              htmlFor='password'
              className='text-sm font-medium text-gray-700'
            >
              Password
            </Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='******'
              className='h-11 border-gray-300 focus:border-black'
              onChange={handleChange}
            />
          </div>

          {/* 5. Confirm Password (صف مستقل) */}
          <div className='space-y-2'>
            <Label
              htmlFor='passwordConfirm'
              className='text-sm font-medium text-gray-700'
            >
              Confirm Password
            </Label>
            <Input
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              placeholder='******'
              className='h-11 border-gray-300 focus:border-black'
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button
            className='w-full h-12 mt-6 text-lg font-bold bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/20 transition-all'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className='text-center text-base text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-extrabold text-black hover:underline transition-colors'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
