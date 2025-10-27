import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MDWResponse } from '@core/models'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AutFormacionColadasPlanosService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'lab/autFormacionColadasPlanos'
  }

  get(data: MDWResponse) : Observable<MDWResponse>{
    return this._http.post<MDWResponse>(this._url, data)
  }
}
