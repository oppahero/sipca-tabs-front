import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { MDWResponse } from '@core/models'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ConsLiberacionColadaPlanosService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'lab/cons-liberacion-coladas-planos'
  }

  get(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data)
  }

}
