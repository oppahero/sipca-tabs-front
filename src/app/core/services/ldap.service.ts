import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { LoginResponse } from '@core/models'

@Injectable({
  providedIn: 'root'
})
export class LdapService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'auth/ldap'
  }

  login(data: any): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(this._url, data)
  }

}
