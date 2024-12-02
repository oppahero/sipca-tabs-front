import { Component, Input } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { TabMenuModule } from 'primeng/tabmenu'

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [TabMenuModule],
  template: `
    <p-tabMenu [model]="items" [activeItem]="activeItem"></p-tabMenu>
  `,
})
export class TabMenuComponent {
  @Input() items!: MenuItem[]
  @Input() activeItem!: MenuItem
}
