import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../../shared/shared.module'
// import { ImpresoraModule } from '../APT/impresora/impresora.module'
import { HelpsAptModule } from '../../helps/APT/helps-apt.module' //// prueba
import { HelpsProModule } from '../../helps/pro/helps-pro.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    // ImpresoraModule,
    HelpsAptModule,
    HelpsProModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpsLabModule {}
