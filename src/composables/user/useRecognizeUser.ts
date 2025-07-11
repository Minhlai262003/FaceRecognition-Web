import { ref } from 'vue'
import { recognizeUser } from '@/api/user/userService'

export function useRecognizeUser() {
  const nameUser = ref<string | null>(null)
  const handleRecognizeUser = async (data: any) => {
    try {
      const response = await recognizeUser(data)

      if (response.recognized) {
        console.log('User recognized:', response.employee)
        console.log('Message:', response.employee.name)
        nameUser.value = response.employee.name
        console.log('nameUser:', nameUser.value)
      }
    } catch (error) {}
  }
  return {
    handleRecognizeUser,
    nameUser,
  }
}
