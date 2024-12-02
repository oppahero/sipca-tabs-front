import { Component, OnInit, OnDestroy } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { GlobalService, OperacionesService } from 'src/app/core/services'

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styles: `
    .operation-title{
      color: black;
      padding: 2px;
      background: rgba(128, 128, 128, 0.705);
      text-align: center;
    }
  `,
})
export class OperacionesComponent implements OnInit, OnDestroy {
  items!: MenuItem[]

  constructor(
    private util: GlobalService,
    private operation: OperacionesService
  ) {}

  ngOnInit(): void {
    this.util.customMessage.subscribe((x) => {
      this.items = x.items
    })
  }

  ngOnDestroy() {
    this.items = []
  }

  activeMenu($event) {
    this.operation.active($event.target.textContent)
  }
}
