import { Type } from '@angular/core'
import { AutCargaDetComponent } from './aut-carga-det/aut-carga-det.component'
import { AutCargaComponent } from './aut-carga/aut-carga.component'

const ejecProgCargaMap: { [key: string]: Type<any> } = {
  AutCargaComponent,
  AutCargaDetComponent,
}

export const ejecProgCargaCommand = {
  componentName: 'AutCargaComponent',
  componentMap: ejecProgCargaMap,
}
