import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../../../../shared/shared.module'
import { HelpsAptModule } from '../../../../helps/APT/helps-apt.module'
import { ConsultaLiberacionColadaPlanosRouting } from './cons-liberacion-colada-planos-routing.module'

import { ConsultaLiberacionColadaPlanosComponent } from './cons-liberacion-colada-planos.component'

@NgModule({
  declarations: [ConsultaLiberacionColadaPlanosComponent],

  imports: [
    CommonModule,
    ConsultaLiberacionColadaPlanosRouting,
    SharedModule,
    HelpsAptModule,
    // HelpsLabModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultaLiberacionColadaPlanosModule {}
