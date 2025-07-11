import { ref } from 'vue'
import { createUser } from '@/api/user/userService'

export function useCreateUser() {
  const loading = ref(false)
  const message = ref<string | null>(null)
  const success = ref<boolean>(false)

  const setMessage = (msg: string, isSuccess: boolean) => {
    message.value = msg
    success.value = isSuccess
  }
  const handleCreateUser = async (data: any) => {
    loading.value = true
    message.value = null
    success.value = false
    try {
      const response = await createUser(data)
      console.log('Registration successful:', response)

      const isSuccess = response.code === 1000
      const responseMessage =
        response.message || (isSuccess ? 'User created successfully' : 'Failed to create user')

      setMessage(responseMessage, isSuccess)
    } catch (error) {
      console.error('Error creating user:', error)
      setMessage('An error occurred while creating the user', false)
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    message,
    success,
    handleCreateUser,
  }
}
