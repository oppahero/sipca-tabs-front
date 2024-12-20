import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../shared/shared.module'
// import { ImpresoraModule } from '../APT/impresora/impresora.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    // ImpresoraModule
  ],
  exports: [],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpsScpModule {}
