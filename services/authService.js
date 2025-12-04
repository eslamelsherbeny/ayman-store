import api from './api'

// نقطة النهاية (Endpoint) لتسجيل الدخول
const LOGIN_URL = 'auth/login'
// نقطة النهاية (Endpoint) لإنشاء الحساب
const REGISTER_URL = 'auth/signup'

/**
 * دالة تسجيل الدخول
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
  try {
    const response = await api.post(LOGIN_URL, { email, password })

    // حفظ التوكن (Token) في التخزين المحلي (Local Storage)
    if (response.token) {
      localStorage.setItem('token', response.token)
    }

    return response.data // ترجع بيانات المستخدم
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message)
    throw new Error(
      error.response?.data?.message || 'Invalid email or password.'
    )
  }
}

/**
 * دالة إنشاء حساب جديد
 * @param {object} userData - يحتوي على name, email, password, passwordConfirm, phone
 */
export const register = async (userData) => {
  try {
    // البيانات المرسلة مطابقة للصيغة التي طلبها الباك إند
    const response = await api.post(REGISTER_URL, userData)

    // حفظ التوكن في التخزين المحلي
    if (response.token) {
      localStorage.setItem('token', response.token)
    }

    return response.data
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message)
    throw new Error(
      error.response?.data?.message ||
        'Registration failed. Please check your inputs.'
    )
  }
}

// ... يمكنك إضافة دالة logout أخرى هنا
