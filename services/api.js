import axios from 'axios'

// ⚠️ تأكد إن الرابط ده هو رابط الباك إند بتاعك
const BASE_URL = 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

// 👇 الجزء السحري: إضافة التوكن لكل طلب أوتوماتيكياً
api.interceptors.request.use(
  (config) => {
    // 1. نتأكد إننا شغالين في المتصفح مش في السيرفر
    if (typeof window !== 'undefined') {
      // 2. نجيب التوكن من المخزن (تأكد ان اسمه 'token' زي ما حفظته وقت اللوجين)
      const token = localStorage.getItem('token')
      console.log('🔑 Token in Interceptor:', token)
      // 3. لو التوكن موجود، نحطه في الهيدر
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
