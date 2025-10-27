import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const mockResponse: any = [
  {
    label: 'Despacho Terrestre',
    items: [
      {
        label: 'Ejecución de Programa de Carga Largos',
        component: 'EjecucionProgramaCargaComponent',
        command: 'ejecProgCargaCommand',
      },
    ],
  },
  {
    label: 'Despacho Marítimo',
    items: [
      {
        label: 'Autorización Asoc Colada',
        component: 'AutorizacionAsocColadaOfaPlanosComponent',
        command: 'autAsocColadaOfaPlnCommand',
      },
      {
        label: 'Consulta Liberación Colada Planos',
        component: 'ConsultaLiberacionColadaPlanosComponent',
        command: 'lconsLibColadasPlnCommand',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class OperationsMenuService {
  private _url: string;

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl + 'operaciones';
  }

  getOperations(sir: string, id: string): Observable<MenuItem[]> {
    // const url = `${this._url}/${sir}/${id}`
    // return this._http.get<MenuItem[]>(url)

    // Para demo
    return of(id ? mockResponse : []);
  }
}
