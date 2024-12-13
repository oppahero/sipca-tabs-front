import { Injectable } from '@angular/core'
import { StorageService } from './storage.service'
import { LoginResponse } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  nameItem = 'UserOPENSIPCA'

  constructor(private _storageService: StorageService) {}

  setSessionStorage(value: any) {
    this._storageService.setItem(this.nameItem, value)
  }

  getSessionStorage(key: string) {
    return this._storageService.getItem(key)
  }

  userIsLoggedIn(key: string) {
    return this.getSessionStorage(key) !== null
  }

  clearToken() {
    this._storageService.clear()
  }

  getUser() {
    const data: LoginResponse = this.getSessionStorage(this.nameItem)
    return data?.user ?? null
  }

  getToken() {
    const data: LoginResponse = this.getSessionStorage(this.nameItem)
    return data?.token ?? null
  }

  getMenu() {
    const data: LoginResponse = this.getSessionStorage(this.nameItem)
    return data?.menu ?? []
  }
}
