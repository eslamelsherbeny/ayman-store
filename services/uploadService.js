import api from './api'

export const uploadImage = async (file) => {
  const formData = new FormData()
  // ⚠️ كلمة 'image' دي هي اسم الحقل اللي الباك إند مستنيه
  // ممكن تكون 'file' أو 'photo' حسب الباك إند بتاعك، اتأكد منها
  formData.append('image', file)

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  // المفروض الباك إند يرجع الرد فيه رابط الصورة
  // مثلا: response.data.imageUrl أو response.data.data
  return response.data
}
