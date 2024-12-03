import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EvaluacionColadasPlanosService {
  private _url: string
  params: any
  table: any[]
  OfaLote : any //
  colada : any

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'evaluacion-coladas-planos'
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

  getTable(): any {
    return this.table ? this.table : []
  }

  setTable(table: any[]) {
    this.table = table
  }

  getColada(): any {
    return this.colada ? this.colada : ''
  }

  setColada(colada: any) {
    this.colada = colada

  }

  getOfaLote(): any {
    return this.OfaLote ? this.OfaLote : ''
  }

  setOfaLote(OfaLote: any) {
    this.OfaLote = OfaLote

  }

}
