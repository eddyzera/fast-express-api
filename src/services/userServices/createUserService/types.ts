import { User } from '@prisma/client'

export interface ICreateUserServiceRequest {
  name: string
  email: string
  password: string
}

export interface ICreateUserServiceResponse {
  user: User
}
