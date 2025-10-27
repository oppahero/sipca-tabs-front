import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '@core/models';

const mockResponse: LoginResponse = {
  user: {
    username: 'devUser',
  },
  token: 'fake-jwt-token',
  menu: [
    {
      icon: 'pi pi-fw pi-briefcase',
      items: [
        {
          label: 'Inventario y Despacho',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              id: '77',
              label: 'Prog. y Seg. de Despacho',
            },
            {
              label: 'Ingresos al Almacén',
            },
          ],
        },
      ],
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class LdapService {
  private _url: string;

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'auth/ldap';
  }

  login(data): Observable<LoginResponse> {
    // return this._http.post<LoginResponse>(this._url, data);
    return of(mockResponse);
  }
}
