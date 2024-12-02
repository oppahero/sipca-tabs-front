import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//** PSD => ITEM PROGRAMACIÓN Y SEGUIMIENTO DE DESPACHO */

const routes: Routes = [
  {
    path: '',
    children: [
      {
        // Ejecución Programa Carga Largos - Por defecto: progCargaLargo
        // path: 'prog-carga-largo',
        // loadChildren: () =>
        //   import(
        //     '../PSD/ejecucion-programa-carga/ejecucion-programa-carga.module'
        //   ).then((m) => m.EjecProgCargaLargosModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PSDRouting {}
