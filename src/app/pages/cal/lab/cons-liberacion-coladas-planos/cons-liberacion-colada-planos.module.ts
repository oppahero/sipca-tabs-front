import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../../../../shared/shared.module'
import { HelpsAptModule } from '../../../../helps/APT/helps-apt.module'

import { ConsultaLiberacionColadaPlanosComponent } from './cons-liberacion-colada-planos.component'

@NgModule({
  declarations: [ConsultaLiberacionColadaPlanosComponent],

  imports: [
    CommonModule,
    SharedModule,
    HelpsAptModule,
    // HelpsLabModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ConsultaLiberacionColadaPlanosComponent,
  ]
})
export class ConsultaLiberacionColadaPlanosModule {}
