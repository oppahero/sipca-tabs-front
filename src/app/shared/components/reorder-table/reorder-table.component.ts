import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'
import { Column } from '@core/models/primeng.interface'
import { ExcelService } from '@core/services'

@Component({
  selector: 'app-reorder-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    ButtonModule,
  ],
  templateUrl: './reorder-table.component.html',
})
export class ReorderTableComponent {
  @Input() cols!: Column[]
  @Input() selected!: any
  @Input() scrollHeight: string = '250px'

  @Input() scrollable: boolean = true
  @Input() autoLayout: boolean = false
  @Input() loading: boolean = false
  @Input() resizable: boolean = false
  @Input() paginator: boolean = false
  @Input() excel: boolean = false
  @Input() filters: boolean = false
  @Input() reorder: boolean = false

  @Input() pag: string | undefined
  @Input() num: number | undefined
  @Input() key: string | undefined
  @Input() title: string | undefined

  @Output() selectedEvent = new EventEmitter<any>()

  filter = false
  first = 0
  rows_!: any[]

  @Input()
  set rows(val: any) {
    this.rows_ = val
    this.first = 0
  }

  constructor(private excelService: ExcelService) {}

  select() {
    this.selectedEvent.emit(this.selected)
  }

  exportExcel() {
    this.excelService.exportAsExcelFile(this.rows_, 'DOCUMENT')
  }

  filtersChange() {
    this.filter = this.filter ? false : true
  }
}
