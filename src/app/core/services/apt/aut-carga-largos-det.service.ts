import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'
import { GlobalService } from '..'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { MDWResponse } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AutCargaLargosDetService {
  private _url: string

  constructor(private _http: HttpClient, private _util: GlobalService) {
    this._url = environment.apiUrl + 'prog-carga-largos-detalle'
  }

  getAll(data): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data).pipe(
      tap((result) => {
        this.formatCols(result.tabla)
      })
    )
  }

  formatCols(aux) {
    return aux.map((p) => {
      if (p.QQ_LONG)
        p['QQ_LONG'] = this._util.formatStringToDecimal(p.QQ_LONG, 5, 2)

      if (p.QQ_ANCHO)
        p['QQ_ANCHO'] = this._util.formatStringToDecimal(p.QQ_ANCHO, 4, 2)

      if (p.QQ_DIAM)
        p['QQ_DIAM'] = this._util.formatStringToDecimal(p.QQ_DIAM, 5, 4)

      if (p.QQ_ESPES)
        p['QQ_ESPES'] = this._util.formatStringToDecimal(p.QQ_ESPES, 3, 3)

      if (p.QQ_CARGA)
        p['QQ_CARGA'] = this._util.formatStringToDecimal(p.QQ_CARGA, 12, 3)

      return p
    })
  }
}
