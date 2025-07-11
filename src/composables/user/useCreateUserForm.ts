import { ref, reactive } from 'vue'
import { useCreateUser } from './useCreateUser'
import { useNotification } from '@kyvg/vue3-notification'
export const useCreateUserForm = () => {
  const genders = ref([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ])
  const roles = ref([
    { label: 'Admin', value: 'admin' },
    { label: 'Employee', value: 'employee' },
  ])
  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    birthDay: '',
    role: '',
    faceImages: Array(10).fill(null) as (File | null)[],
  })

  const birthday = ref<Date | null>(null)
  const errors = reactive<Record<string, string>>({})
  const { notify } = useNotification()
  const { message, success, handleCreateUser } = useCreateUser()
  const validate = () => {
    Object.keys(errors).forEach((key) => delete errors[key])

    const nameRegex = /^[A-Za-z\s]+$/
    const emailRegex = /^\S+@\S+\.\S+$/
    const phoneRegex = /^\d+$/

    if (!form.firstName.trim()) {
      errors.firstName = 'First name is required.'
    } else if (!nameRegex.test(form.firstName)) {
      errors.firstName = 'First name can only contain letters and spaces.'
    }

    if (!form.lastName.trim()) {
      errors.lastName = 'Last name is required.'
    } else if (!nameRegex.test(form.lastName)) {
      errors.lastName = 'Last name can only contain letters and spaces.'
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Invalid email format.'
    }

    if (!birthday.value) {
      errors.birthDay = 'Birthday is required.'
    }

    if (!form.gender) {
      errors.gender = 'Gender is required.'
    }

    if (!form.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.'
    } else if (!phoneRegex.test(form.phoneNumber)) {
      errors.phoneNumber = 'Phone number can only contain digits.'
    }

    if (!form.role) {
      errors.role = 'Role is required.'
    }

    return Object.keys(errors).length === 0
  }

  const setBirthday = () => {
    if (birthday.value) {
      const d = birthday.value
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      form.birthDay = `${year}-${month}-${day}`
    }
  }

  const submit = async (onSuccess?: () => void, onError?: () => void) => {
    const isValid = validate()
    if (!isValid) {
      return
    }

    setBirthday()
    await handleCreateUser(form)
    if (success.value) {
      notify({
        title: 'Success',
        text: message.value || 'User created successfully',
        type: 'success',
      })
      onSuccess?.()
    } else {
      notify({ title: 'Error', text: message.value || 'Failed to create user', type: 'error' })
      onError?.()
    }
  }

  const resetForm = () => {
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.gender = ''
    form.phoneNumber = ''
    form.birthDay = ''
    form.role = ''
    form.faceImages = Array(10).fill(null)
    birthday.value = null
    Object.keys(errors).forEach((key) => delete errors[key])
  }
  return {
    form,
    birthday,
    errors,
    validate,
    submit,
    genders,
    roles,
    resetForm,
  }
}
