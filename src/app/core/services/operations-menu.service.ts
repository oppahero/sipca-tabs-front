import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OperationsMenuService {

  private _url: string

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'operaciones'
  }

  getOperations(sir: string, id: any) : Observable<MenuItem[]> {
    const url = `${this._url}/${sir}/${id}`
    return this._http.get<MenuItem[]>(url)
  }

}
