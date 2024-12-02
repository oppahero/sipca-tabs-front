import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AutCargaLargosCanService {
  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'ejec-prog-cargas-largos-cancela'
  }

  cancel(data: any): Observable<any> {
    return this._http.post<any>(this._url, data)
  }
}
