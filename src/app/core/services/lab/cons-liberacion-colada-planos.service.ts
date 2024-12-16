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

  params: any
  colada: any

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'lab/cons-liberacion-coladas-planos'
  }

  getAll(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data)
  }

  /** GETS Y SETS */

  getParams(): any {
    return this.params ? this.params : {}
  }

  setParams(params: any) {
    this.params = params
  }

  getColada(): any {
    return this.colada ? this.colada : ''
  }

  setColada(colada: any) {
    this.colada = colada
  }
}
