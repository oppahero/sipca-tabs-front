import { Type } from '@angular/core'

export interface TabSelected {
  label: string
  componentName: string
  componentMap?: { [key: string]: Type<any> }
}
