export interface User {
  id: number
  id_persona: number
  email: string
  admin: boolean
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
