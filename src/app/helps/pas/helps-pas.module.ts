import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../shared/shared.module'
// import { ImpresoraModule } from '../APT/impresora/impresora.module'

import { HelpsLabModule } from '../lab/helps-lab.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    // ImpresoraModule,
    HelpsLabModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpsPasModule {}
