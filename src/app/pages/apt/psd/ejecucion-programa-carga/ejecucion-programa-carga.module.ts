import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EjecucionProgramaCargaTabsComponent } from './ejecucion-programa-carga-tabs.component'
import { AutCargaComponent } from './aut-carga/aut-carga.component'
import { SharedModule } from '../../../../shared/shared.module'
import { AutCargaDetComponent } from './aut-carga-det/aut-carga-det.component'
import { HelpsAptModule } from '../../../../helps/APT/helps-apt.module'
import { AccordionModule } from 'primeng/accordion'

@NgModule({
  declarations: [
    EjecucionProgramaCargaTabsComponent,
    AutCargaComponent,
    AutCargaDetComponent,
    // AutCargaAltComponent,
    // AutCargaDespCentExtComponent,
    // AutCargaDevFrentComponent,
    // AutCargaReimpComponent,
    // AutCargaReoComponent,
    // AutCargaSegComponent,
    // FrentDespDetComponent,
    // FrentDespResComponent,
    // FrentDespComponent,
    // OrdProgDetComponent,
    // OrdProgComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HelpsAptModule,
    AccordionModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AutCargaComponent,
    AutCargaDetComponent,
  ]
})
export class EjecProgCargaLargosModule {}
