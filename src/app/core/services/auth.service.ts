import { Injectable } from '@angular/core'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _storageService: StorageService) {}

  public login(userInfo: any) {
    sessionStorage.setItem('UserOPENSIPCA', JSON.stringify(userInfo))
  }

  public isLoggedIn() {
    return sessionStorage.getItem('UserOPENSIPCA') !== null
  }

  public logout() {
    sessionStorage.removeItem('UserOPENSIPCA')
  }

  public getCurrentUser() {
    return sessionStorage.getItem('UserOPENSIPCA')
  }

  // SESSION STORAGE ENCRIPTADO

  setSessionStorage(key: string, value: any) {
    this._storageService.secureStorage.setItem(key, value)
  }

  getSessionStorage(key: string) {
    const user = this._storageService.secureStorage.getItem(key)
    if (user) {
      user.username = user.username.toUpperCase()
    }
    return user
  }

  userIsLoggedIn(key: string) {
    return this._storageService.secureStorage.getItem(key) !== null
  }

  clearToken() {
    return this._storageService.secureStorage.clear()
  }

  user() {
    return this.getSessionStorage('userOPENSIPCA')
  }
}
