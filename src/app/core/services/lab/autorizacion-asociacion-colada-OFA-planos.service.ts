import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AutorizacionAsociacionColadaOFAPlanosService {
  params: any
  tabla: any
  private _url: string
  backFlag_: boolean
  backFlag_2: boolean
  backFlag_3: boolean
  backFlag_4: boolean
  accion_aux: any

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'lab/autorizacionAsociacionColadaOFAPlanos'
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

  getTabla(): any {
    return this.tabla ? this.tabla : []
  }

  setTabla(tabla: any[]) {
    this.tabla = tabla
  }

  getBackFlag() {
    return this.backFlag_ ? true : false
  }

  setBackFlag(value: boolean) {
    this.backFlag_ = value
  }

  getBackFlagAfc() {
    return this.backFlag_2 ? true : false
  }

  setBackFlagAfc(value: boolean) {
    this.backFlag_2 = value
  }

  getAcepConfFlag() {
    return this.backFlag_3 ? true : false
  }

  setAcepConfFlag(value: boolean) {
    this.backFlag_3 = value
  }

  getAccion(): any {
    return this.accion_aux ? this.accion_aux : {}
  }

  setAccion(accion_aux: any) {
    this.accion_aux = accion_aux
  }

  getBackFlagEvalCdaP() {
    return this.backFlag_4 ? true : false
  }

  setBackFlaEvalCdaP(value: boolean) {
    this.backFlag_4 = value
  }
}
