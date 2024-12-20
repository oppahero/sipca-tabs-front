import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { MDWResponse } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AutCargaLargosCanService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'apt/ejec-prog-cargas-largos-cancela'
  }

  cancel(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data)
  }
}
