import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

@NgModule({
  exports: [
    CommonModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ScpModule {}
