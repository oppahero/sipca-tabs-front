import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AutorizacionAsociacionColadaOFAPlanosService {
  private params: any
  private tabla: any
  private url: string
  private backFlag_:boolean
  private backFlag_2:boolean
  private backFlag_3:boolean
  private backFlag_4:boolean
  private accion_aux: any

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'autorizacionAsociacionColadaOFAPlanos'
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

  getTabla(): any {
    return this.tabla ? this.tabla : []
  }

  setTabla(tabla: any[]) {
    this.tabla = tabla
  }

  getBackFlag() {
    return this.backFlag_ ? true : false
  }

  setBackFlag(value:boolean) {
    this.backFlag_ = value

  }

  getBackFlagAfc() {
    return this.backFlag_2 ? true : false
  }

  setBackFlagAfc(value:boolean) {
    this.backFlag_2= value

  }

  getAcepConfFlag() {
    return this.backFlag_3 ? true : false
  }

  setAcepConfFlag(value:boolean) {
    this.backFlag_3= value

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

  setBackFlaEvalCdaP(value:boolean) {
    this.backFlag_4= value

  }

}
