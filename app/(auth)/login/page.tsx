'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { login } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false) // للتحكم في ظهور الرسالة
  const router = useRouter()
  const { loginContext } = useAuth()

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
      }, 6000) // تختفي بعد 3 ثواني
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await login(email, password)
      const userData = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        token: res.token,
        role: res.data.role,
      }
      loginContext(userData)
      router.push('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full max-w-md mx-auto mt-10 p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 relative'>
      <Link
        href='/'
        className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6'
      >
        <ArrowLeft className='h-4 w-4' /> Back to Store
      </Link>

      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold tracking-tight text-foreground'>
          Welcome back
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Sign in to your account
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email address</Label>
          <Input
            id='email'
            type='email'
            placeholder='name@example.com'
            required
            className='h-10'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password'>Password</Label>
            <Link
              href='#'
              className='text-xs font-medium text-primary hover:underline'
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            required
            className='h-10'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* رسالة الخطأ مع انيميشن */}
        {showError && error && (
          <p className='text-red-600 text-sm mt-1 text-center font-medium animate-fadeInOut'>
            {error}
          </p>
        )}

        <Button
          className='w-full h-10 text-sm font-medium flex items-center justify-center gap-2'
          type='submit'
          disabled={isLoading}
        >
          {isLoading && (
            <span className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
          )}
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className='text-center text-sm text-muted-foreground mt-6'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='font-semibold text-primary hover:underline'
        >
          Sign up
        </Link>
      </p>

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-5px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </div>
  )
}
