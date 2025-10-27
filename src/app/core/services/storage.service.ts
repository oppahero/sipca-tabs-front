import { Injectable } from '@angular/core'
import * as CryptoJS from 'crypto-js'
import * as SecureStorage from 'secure-web-storage'

const SECRET_KEY = 'Ber1g0'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, Object(SECRET_KEY))

      return key.toString()
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY)

      data = data.toString()

      return data
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY)

      data = data.toString(CryptoJS.enc.Utf8)

      return data
    }
  })

  getSecureStorage() {
    return this.secureStorage
  }

  setItem(nameItem: string, value: any) {
    this.secureStorage.setItem(nameItem, value)
  }

  getItem(key: string) {
    return this.secureStorage.getItem(key)
  }

  clear() {
    this.secureStorage.clear()
  }
}
