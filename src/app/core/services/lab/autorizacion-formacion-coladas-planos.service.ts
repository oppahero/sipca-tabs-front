import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AutFormacionColadasPlanosService {
  private _url: string
  params: any
  colada: any

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'autFormacionColadasPlanos'
  }

  getAll(data: any) {
    return this._http.post<any>(this._url, data)
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
