import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EvaluacionColadasPlanosService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'lab/evaluacion-coladas-planos'
  }

  getAll(data: any) {
    return this._http.post<any>(this._url, data)
  }

}
