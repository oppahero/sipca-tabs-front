import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Column } from '@core/models/primeng.interface'

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
})
export class AyudaComponent {
  @Input() helpTitle: string = ''
  @Input() cols!: Column[]
  @Input() rows: any[] = []
  @Input() selected!: any
  @Input() breakpoints!: object

  @Input() displayHelp: boolean = false
  @Input() loading: boolean = false
  @Input() excel: boolean = false
  @Input() paginator: boolean = false
  @Input() filters: boolean = false
  @Input() nextFlag: boolean = false
  @Input() previousFlag: boolean = false

  @Input() pag: string | undefined
  @Input() num: number | undefined
  @Input() W_C_MENSA: string | undefined
  @Input() W_SALGO: string | undefined
  @Input() W_MENSA: string | undefined

  @Output() displayEvent = new EventEmitter<boolean>()
  @Output() selectEvent = new EventEmitter<any>()
  @Output() previousPageEvent = new EventEmitter<any>()
  @Output() nextPageEvent = new EventEmitter<any>()

  previousPageFlag(): boolean {
    return this.pag > '001' ? false : true
  }

  nextPageFlag(): boolean {
    return this.W_C_MENSA === '010' ||
      this.W_MENSA === '193 CONTINUA' ||
      this.W_SALGO === 'S' ||
      this.W_MENSA === 'CONTINUA'
      ? false
      : true
  }

  /** Puente comunicación*/

  displayChange(value: boolean) {
    this.displayEvent.emit(value)
  }

  close() {
    this.displayHelp = false
    this.displayChange(this.displayHelp)
  }

  select() {
    this.selectEvent.emit(this.selected)
    this.close()
  }

  nextPage() {
    this.nextPageEvent.emit()
  }

  previousPage() {
    this.previousPageEvent.emit()
  }

  selectedRow(value: any) {
    this.selected = value
  }
}
