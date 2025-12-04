'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// 1. تعريف القيم الافتراضية
const initialUserState = {
  id: null,
  name: '',
  email: '',
  token: null,
  role: null,
}

const AuthContext = createContext({
  user: initialUserState,
  isAuthenticated: false,
  isLoading: true,
  loginContext: (userData) => {},
  logoutContext: () => {},
})

// 2. الهوك المخصص
export const useAuth = () => {
  return useContext(AuthContext)
}

// 3. المزود (Provider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // هذا الـ Effect يعمل مرة واحدة فقط عند فتح الموقع
  useEffect(() => {
    const initializeAuth = () => {
      // أ. محاولة قراءة بيانات المستخدم المحفوظة من قبل
      const storedUser = localStorage.getItem('userData')
      const storedToken = localStorage.getItem('Token')

      if (storedToken && storedUser) {
        // ب. إذا وجدنا بيانات، نسترجعها ونعتبره مسجل دخول
        try {
          setUser(JSON.parse(storedUser))
          setIsAuthenticated(true)
        } catch (e) {
          console.error('Error parsing user data', e)
          localStorage.removeItem('Token')
          localStorage.removeItem('userData')
        }
      }
      // ج. نوقف شاشة التحميل
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  // دالة تسجيل الدخول
  const loginContext = (userData) => {
    // 1. تحديث الـ State
    setUser(userData)
    setIsAuthenticated(true)

    // 2. حفظ البيانات في المتصفح (عشان لما يعمل Refresh ميروحش الدخول)
    if (userData?.token) {
      localStorage.setItem('Token', userData.token)
    }
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  // دالة تسجيل الخروج
  const logoutContext = () => {
    // 1. تنظيف الـ State
    setUser(initialUserState)
    setIsAuthenticated(false)

    // 2. مسح البيانات من المتصفح
    localStorage.removeItem('Token')
    localStorage.removeItem('userData')

    // 3. التوجيه لصفحة الدخول
    window.location.href = '/login'
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginContext,
    logoutContext,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
