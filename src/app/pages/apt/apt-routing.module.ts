import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//** APT => PESTAÑA INVENTARIO Y DESPACHO  */

const routes: Routes = [
  {
    path: '',
    children: [
      //OPCIÓN: PROG. Y SEGUIMIENTO DE DESPACHO
      // {
      //   path: 'psd',
      //   loadChildren: () => import('./PSD/psd.module').then((m) => m.PSDModule),
      // },
      //OPCIÓN: INGRESOS AL ALMACEN
      // {
      //   path: 'ia',
      //   loadChildren: () => import('./IA/ia.module').then((m) => m.IAModule),
      // },
      //OPCIÓN: GESTIÓN DE ALMACÉN
      // {
      //   path: 'ga',
      //   loadChildren: () => import('./GA/ga.module').then((m) => m.GAModule),
      // },
      //OPCIÓN: GESTIÓN Y CONTROL DE INVENTARIO
      // {
      //   path: 'gci',
      //   loadChildren: () => import('./GCI/gci.module').then((m) => m.GCIModule),
      // },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class APTRouting {}
