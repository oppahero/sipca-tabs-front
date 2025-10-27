import { environment } from 'src/environments/environment'
import { GlobalService } from '../global.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MDWResponse } from '@core/models'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AutCargaLargosService {
  private _url: string

  constructor(private _http: HttpClient, private _util: GlobalService) {
    this._url = environment.apiUrl + 'apt/ejec-prog-cargas-largos'
  }

  get(data: MDWResponse): Observable<MDWResponse> {
    return this._http.post<MDWResponse>(this._url, data)
  }

}
