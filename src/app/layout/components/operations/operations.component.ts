import { Component, OnInit, OnDestroy } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { GlobalService } from 'src/app/core/services'
import { OperationsService } from '../../service/operations.service'

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styles: `
    .operation-title{
      color: black;
      padding: 2px;
      background: rgba(128, 128, 128, 0.705);
      text-align: center;
    }
  `,
})
export class OperationsComponent implements OnInit, OnDestroy {
  items!: MenuItem[]

  constructor(
    private _util: GlobalService,
    private _operation: OperationsService
  ) {}

  ngOnInit(): void {
    this._operation.customMessage.subscribe((x) => {
      this.items = x.items
    })
  }

  ngOnDestroy() {
    this.items = []
  }

  activeMenu($event) {
    // this._operation.active($event.target.textContent)
  }
}
