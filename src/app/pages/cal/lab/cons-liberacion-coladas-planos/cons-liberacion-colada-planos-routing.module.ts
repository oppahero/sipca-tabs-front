import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// import { ConsultaLiberacionColadaPlanosComponent} from './cons-liberacion-colada-planos.component'
// import { AutorizacionAsocColadaOfaPlanosComponent} from '../autorizacion-asoc-colada-ofa-planos/autorizacion-asoc-colada-ofa-planos.component'
// import { AutorizacionAsocColadaOfaAltaPlanosComponent} from '../autorizacion-asoc-colada-ofa-planos/autorizacion-asoc-colada-ofa-alta-planos/autorizacion-asoc-colada-ofa-alta-planos.component'
// import { AutorizacionAsocColadaOfaModPlanosComponent} from '../autorizacion-asoc-colada-ofa-planos/autorizacion-asoc-colada-ofa-mod-planos/autorizacion-asoc-colada-ofa-mod-planos.component'

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '',
      //   component: ConsultaLiberacionColadaPlanosComponent,
      // },
      // {
      //   path: 'autorizacion-asoc-colada-ofa-planos',
      //   children: [
      //     {

      //       path: '',
      //       component: AutorizacionAsocColadaOfaPlanosComponent,

      //     },
      //     /*      {
      //             path: 'modificar',
      //             component: AutorizacionAsocColadaOfaModPlanosComponent,
      //           },
      //           {
      //             path: 'alta',
      //             component: AutorizacionAsocColadaOfaAltaPlanosComponent,
      //           },*/
      //   ],
      // },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaLiberacionColadaPlanosRouting {}
