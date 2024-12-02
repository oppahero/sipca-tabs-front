import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ConsLiberacionColadaPlanosMttoService {
  private params: any
  private url: string

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'liberacion-coladas-planos'
  }

  getAll(data: any) {
    return this.http.post<any>(this.url, data)
  }

  /** GETS Y SETS */

  getParams(): any {
    return this.params ? this.params : {}
  }

  setParams(params: any) {
    this.params = params
  }
}
