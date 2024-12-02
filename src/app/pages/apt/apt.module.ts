import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { APTRouting } from './apt-routing.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    APTRouting,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class APTModule {}
