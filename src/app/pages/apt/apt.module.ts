import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EjecProgCargaLargosModule } from './psd/ejecucion-programa-carga/ejecucion-programa-carga.module'

@NgModule({
  exports: [
    CommonModule,
    EjecProgCargaLargosModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AptModule {}
