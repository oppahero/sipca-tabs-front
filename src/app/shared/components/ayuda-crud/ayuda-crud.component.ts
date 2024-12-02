import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Column } from '@core/models/primeng.interface'

@Component({
  selector: 'app-ayuda-crud',
  templateUrl: './ayuda-crud.component.html',
})
export class AyudaCrudComponent {
  @Input() helpTitle: string = ''
  @Input() cols!: Column[]
  @Input() rows: any[] = []
  @Input() selected!: any

  @Input() displayHelp: boolean = false
  @Input() loading: boolean = false
  @Input() excel: boolean = false
  @Input() paginator: boolean = false
  @Input() filters: boolean = false
  @Input() nextFlag: boolean = false
  @Input() previousFlag: boolean = false
  @Input() detailFlag: boolean = false
  @Input() altaFlag: boolean = false
  @Input() bajaFlag: boolean = false
  @Input() updateFlag: boolean = false
  @Input() acceptFlag: boolean = false

  @Input() pag: string | undefined
  @Input() num: number | undefined
  @Input() W_C_MENSA: string | undefined
  @Input() W_SALGO: string | undefined
  @Input() W_MENSA: string | undefined
  @Input() W_PROG: string | undefined
  @Input() W_INDICE: string | undefined
  @Input() W_PRIM_LIN: string | undefined

  @Output() displayEvent = new EventEmitter<boolean>()
  @Output() selectEvent = new EventEmitter<any>()

  @Output() previousPageEvent = new EventEmitter<any>()
  @Output() nextPageEvent = new EventEmitter<any>()

  @Output() detailPageEvent = new EventEmitter<any>()
  @Output() updatePageEvent = new EventEmitter<any>()
  @Output() altaPageEvent = new EventEmitter<any>()
  @Output() bajaPageEvent = new EventEmitter<any>()

  constructor() {
    this.paginator = false
  }

  previousPageFlag(): boolean {
    return this.pag > '001' ? false : true
  }

  nextPageFlag(): boolean {
    return this.W_MENSA === '42 ** CONTINUA' ||
      this.W_MENSA === '193 CONTINUA' ||
      this.W_SALGO === 'S'
      ? false
      : true
  }

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

  previousPage() {
    this.previousPageEvent.emit()
  }

  nextPage() {
    this.nextPageEvent.emit()
  }

  detailPage() {
    this.detailPageEvent.emit()
  }

  altaPage() {
    this.altaPageEvent.emit()
  }

  bajaPage() {
    this.bajaPageEvent.emit()
  }

  updatePage() {
    this.updatePageEvent.emit()
  }

  selectedRow(value: any) {
    this.selected = value
  }
}
