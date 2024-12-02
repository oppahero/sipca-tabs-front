import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Response } from '../models'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LdapService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrlLDAP + 'ldap/login'
  }

  login(data: any): Observable<Response> {
    return this._http.post<Response>(this._url, data)
  }

}
