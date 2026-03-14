export interface User {
  id: number
  id_persona: number
  email: string
  admin: boolean
  rol_id: number
  persona?: {
    id: number
    nombre: string
    apellido_p: string
    apellido_m?: string
    celular: string
    activo: boolean
  }
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  nombre: string
  apellido_p: string
  apellido_m?: string
  celular: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  user: User
}

export interface ChangePasswordCredentials {
  current_password: string
  new_password: string
  new_password_confirmation: string
}
