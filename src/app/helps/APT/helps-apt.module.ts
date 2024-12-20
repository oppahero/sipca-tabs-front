import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'
// import { ImpresoraModule } from '../APT/impresora/impresora.module'

import { EdoProgramaComponent } from './edo-programa/edo-programa.component'

@NgModule({
  declarations: [
    EdoProgramaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // ImpresoraModule
  ],
  exports: [
    EdoProgramaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpsAptModule {}
