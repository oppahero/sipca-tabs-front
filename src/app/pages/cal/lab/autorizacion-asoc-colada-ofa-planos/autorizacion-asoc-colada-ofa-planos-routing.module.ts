import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// import { AutorizacionAsocColadaOfaPlanosComponent } from './autorizacion-asoc-colada-ofa-planos.component';
// import { AutorizacionAsocColadaOfaAltaPlanosComponent } from './autorizacion-asoc-colada-ofa-alta-planos/autorizacion-asoc-colada-ofa-alta-planos.component';
// import { ObsLiberacionComponent } from './obs-liberacion/obs-liberacion.component';
// import { ObsLiberacionMttoComponent } from './obs-liberacion/obs-liberacion-mtto/obs-liberacion-mtto.component';
// import { AutorizacionAsocColadaOfaModPlanosComponent } from './autorizacion-asoc-colada-ofa-mod-planos/autorizacion-asoc-colada-ofa-mod-planos.component';
// import { AutorizacionAsocColadaOfaConfirmaPlanosComponent } from './autorizacion-asoc-colada-ofa-confirma-planos/autorizacion-asoc-colada-ofa-confirma-planos.component';
// import { AutorizacionAsocColadaOfaConfirmaOkPlanosComponent } from './autorizacion-asoc-colada-ofa-confirma-ok-planos/autorizacion-asoc-colada-ofa-confirma-ok-planos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '',
      //   component: AutorizacionAsocColadaOfaPlanosComponent,
      // },
      // {
      //   path: 'alta',
      //   children: [
      //     {
      //       path: '',
      //       component: AutorizacionAsocColadaOfaAltaPlanosComponent,
      //     },
      //     {
      //       path: 'obs-liberacion',
      //       children: [
      //         {
      //           path: '',
      //           component: ObsLiberacionComponent,
      //         },
      //         {
      //           path: 'mtto/:action',
      //           component: ObsLiberacionMttoComponent,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'confirmar',
      //       component: AutorizacionAsocColadaOfaConfirmaPlanosComponent,
      //     },
      //     {
      //       path: 'confirmarOk',
      //       component: AutorizacionAsocColadaOfaConfirmaOkPlanosComponent,
      //     },
      //   ],
      // },
      // {
      //   path: 'modificar',
      //   children: [
      //     {
      //       path: '',
      //       component: AutorizacionAsocColadaOfaModPlanosComponent,
      //     },
      //     {
      //       path: 'obs-liberacion',
      //       children: [
      //         {
      //           path: '',
      //           component: ObsLiberacionComponent,
      //         },
      //         {
      //           path: 'mtto/:action',
      //           component: ObsLiberacionMttoComponent,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'confirmar',
      //       component: AutorizacionAsocColadaOfaConfirmaPlanosComponent,
      //     },
      //     {
      //       path: 'confirmarOk',
      //       component: AutorizacionAsocColadaOfaConfirmaOkPlanosComponent,
      //     },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizacionAsocColadaOfaPlanosRouting { }
