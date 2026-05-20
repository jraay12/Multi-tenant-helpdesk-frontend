export interface LoginUserInput {
  email: string
  password: string
}

export interface UserRegisterInput {
  name: string
  email: string
  password: string
}

export interface myDetails {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}