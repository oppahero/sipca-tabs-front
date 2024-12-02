import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { PanelModule } from 'primeng/panel'

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, PanelModule],
  template: `
    <p-panel header="{{ header }}" [toggleable]="toogle">
      <ng-content></ng-content>
    </p-panel>
  `,
})
export class PanelComponent {
  @Input() header: string = ''
  @Input() toogle: boolean = false
}
