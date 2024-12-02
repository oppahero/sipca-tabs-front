import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrlPermanencia + 'permanencias'
  }

  /* Obtener cedula dado el siglado */
  getCiBySir(datos: any): Observable<[]> {
    const url = `${this._url}/cedula`
    return this._http.post<any>(url, datos)
  }
}
