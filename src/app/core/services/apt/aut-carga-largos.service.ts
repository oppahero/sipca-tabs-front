import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { GlobalService } from '../global.service'
import { environment } from 'src/environments/environment'
import { MDWResponse } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AutCargaLargosService {
  private _url: string
  params: any
  date: any

  constructor(private _http: HttpClient, private _util: GlobalService) {
    this._url = environment.apiUrl + 'apt/ejec-prog-cargas-largos'
  }

  getAll(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data).pipe(
      tap((result) => {
        this.formatCols(result.tabla)
      })
    )
  }

  formatCols(aux) {
    return aux.map((p) => {
      if (p.QQ_CARGA_PROG) p['QQ_CARGA_PROG'] = parseInt(p.QQ_CARGA_PROG)
      if (p.QQ_CARGA_DESP) p['QQ_CARGA_DESP'] = parseInt(p.QQ_CARGA_DESP)
      return p
    })
  }

  /** GETS Y SETS */

  getParams(): any {
    return this.params ?? {}
  }

  setParams(params: any) {
    this.params = params
  }

  getDate(): any {
    return this.date ? this.date : null
  }

  setDate(item: any) {
    this.date = item
  }

  setAut(aut) {
    this.params.N_SECUEN_PROG_MDW = aut
  }
}
