import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { BlockUIModule } from 'primeng/blockui'

@Component({
  selector: 'app-block-ui',
  standalone: true,
  template: ' <p-blockUI [blocked]="blocked"></p-blockUI> ',
  imports: [CommonModule, BlockUIModule],
})
export class BlockUiComponent {
  @Input() blocked: boolean = false
}
