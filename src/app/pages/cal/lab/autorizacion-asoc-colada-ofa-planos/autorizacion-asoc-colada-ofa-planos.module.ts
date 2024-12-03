import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../../../../shared/shared.module'
import { HelpsAptModule } from '../../../../helps/APT/helps-apt.module'
import { AutorizacionAsocColadaOfaPlanosComponent } from './autorizacion-asoc-colada-ofa-planos.component'

@NgModule({
  declarations: [
    AutorizacionAsocColadaOfaPlanosComponent,
  ],
  imports: [CommonModule,SharedModule,HelpsAptModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AutorizacionAsocColadaOfaPlanosComponent
  ]
})
export class AutorizacionAsocColadaOfaPlanosModule {}
