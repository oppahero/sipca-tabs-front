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
  parametro: any;
  tabla?;
  tabla1?;
  tabla2?;
  tabla3?;
  tabla4?;
  tabla5?;
}
