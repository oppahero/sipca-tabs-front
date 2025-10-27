import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { MDWResponse } from '@core/models'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AutCargaLargosDetService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'apt/prog-carga-largos-detalle'
  }

  get(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data)
  }

}
