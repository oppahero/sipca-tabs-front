import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AutorizacionAsocColadaOfaPlanosModule } from './lab/autorizacion-asoc-colada-ofa-planos/autorizacion-asoc-colada-ofa-planos.module'
import { ConsultaLiberacionColadaPlanosModule } from './lab/cons-liberacion-coladas-planos/cons-liberacion-colada-planos.module'

@NgModule({
  exports: [
    CommonModule,
    AutorizacionAsocColadaOfaPlanosModule,
    ConsultaLiberacionColadaPlanosModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalModule {}
