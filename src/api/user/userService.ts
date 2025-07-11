import springApi from '@/api/springApi'
import pythonApi from '@/api/pythonApi'
export interface CreateUserForm {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  birthDay: string
  gender: string
  role: string
  faceImages: File[]
}

export interface CreateUserResponse {
  code: number
  message: string
  result: string
}

export interface RecognizeFaceRequest {
  image: File
}
export interface Employee {
  id: string
  name: string
  department: string
}

export interface RecognizeFaceResponse {
  status: string
  employee: Employee
  message: string
  recognized: boolean
}

export const createUser = async (data: CreateUserForm): Promise<CreateUserResponse> => {
  const formData = new FormData()

  formData.append('email', data.email)
  formData.append('firstName', data.firstName)
  formData.append('lastName', data.lastName)
  formData.append('phoneNumber', data.phoneNumber)
  formData.append('birthDay', data.birthDay)
  formData.append('gender', data.gender)
  formData.append('role', data.role)

  data.faceImages.forEach((file, index) => {
    formData.append('faceImages', file)
  })

  const response = await springApi.post<CreateUserResponse>('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
export const recognizeUser = async (data: RecognizeFaceRequest): Promise<RecognizeFaceResponse> => {
  const response = await pythonApi.post<RecognizeFaceResponse>('/recognize', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
