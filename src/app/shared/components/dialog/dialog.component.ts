import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  imports: [CommonModule, DialogModule],
})
export class DialogComponent {
  @Input() displayHelp!: boolean
  @Input() draggable!: boolean
  @Input() maximizable!: boolean
  @Input() modal!: boolean
  @Input() resizable!: boolean
  @Input() closable!: boolean
  @Input() height!: string
  @Input() width!: string
  @Input() header: string
  @Input() breakpoints!: object

  constructor() {
    this.width = '50vw'
  }
}
