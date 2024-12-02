import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { MDWResponse } from '@core/models'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ConsLiberacionColadaPlanosService {
  private _params: any
  private _url: string
  private _colada: any

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'cons-liberacion-coladas-planos'
  }

  getAll(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data)
  }

  /** GETS Y SETS */

  getParams(): any {
    return this._params ? this._params : {}
  }

  setParams(params: any) {
    this._params = params
  }

  getColada(): any {
    return this._colada ? this._colada : ''
  }

  setColada(colada: any) {
    this._colada = colada
  }
}
