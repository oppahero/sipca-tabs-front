import { MenuItem } from 'primeng/api'
import { User } from './user.interface'

export interface ApiResponse<T> {
  success?: boolean
  data?: T | undefined
  message?: string
}

export interface LoginResponse {
  user: User
  menu: MenuItem[]
  token: string
}

// export interface LoginResponse {
//   success?: boolean
//   data: LoginData
// }

export interface MDWResponse {
  parametro: any
  tabla?: any[]
  tabla1?: any[]
  tabla2?: any[]
  tabla3?: any[]
  tabla4?: any[]
  tabla5?: any[]
  tabla6?: any[]
  tabla7?: any[]
}
