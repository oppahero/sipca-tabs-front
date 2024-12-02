import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PSDRouting } from './psd-routing.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PSDRouting,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PSDModule {}
