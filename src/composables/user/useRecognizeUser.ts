import { ref } from 'vue'
import { recognizeUser } from '@/api/user/userService'

export function useRecognizeUser() {
  const nameUser = ref<string | null>(null)
  const handleRecognizeUser = async (data: any) => {
    try {
      const response = await recognizeUser(data)

      if (response.recognized) {
        nameUser.value = response.employee.name
        setTimeout(() => {
          nameUser.value = null
        }, 5000)
      }
    } catch (error) {}
  }
  return {
    handleRecognizeUser,
    nameUser,
  }
}
