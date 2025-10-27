import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-ejecucion-programa-carga-tabs',
  template: `
    <app-tab-menu [items]="items" [activeItem]="activeItem"></app-tab-menu>
  `,
})
export class EjecucionProgramaCargaTabsComponent implements OnInit {
  items: MenuItem[]
  activeItem: MenuItem

  ngOnInit(): void {
    this.items = [
      {
        label: 'Autorización Carga',
      },
      { label: 'Ord. Programadas' },
      { label: 'Frente de Despacho'},
    ]

    this.activeItem = this.items[0]
  }

}
