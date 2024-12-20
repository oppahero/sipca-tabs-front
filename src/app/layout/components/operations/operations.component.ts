import { OperationsService } from '../../service/operations.service'
import { OpenInTabService } from '../../service/open-in-tab.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { operationCommand } from '../../commands/commands'
import { MenuItem } from 'primeng/api'
import { Subscription } from 'rxjs'

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
  operationSuscription!: Subscription

  constructor(
    private _operation: OperationsService,
    private _dynamicTab: OpenInTabService
  ) {}

  ngOnInit(): void {
    this.operationSuscription = this._operation.operation$.subscribe((data) => {
      if (data.items) this.addCommandsToOperationsMenu(data.items)
    })
  }

  ngOnDestroy() {
    if (this.operationSuscription) this.operationSuscription.unsubscribe()
  }

  addCommandsToOperationsMenu(operations: MenuItem[]) {
    this.items = operations.map((group) => {
      group.items = group.items.map((item) => {
        return {
          ...item,
          command: () => {
            this.operationClick(item, item.command.toString())
          },
        }
      })
      return group
    })
  }

  operationClick(item: MenuItem, commandName: string) {
    this._dynamicTab.newTab({
      label: item.label,
      ...operationCommand[commandName],
    })
  }
}
