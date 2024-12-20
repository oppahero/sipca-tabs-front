import { OperationsService } from '../../service/operations.service'
import { LayoutService } from '../../service/app.layout.service'
import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { User } from '@core/models'
import {
  AuthService,
  GlobalService,
  OperationsMenuService,
} from '@core/services'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit  {
  model: any[] = []
  user!: User
  items!: MenuItem[]
  asset!: string

  constructor(
    public util: GlobalService,
    public layoutService: LayoutService,
    private _operationsService: OperationsService,
    private _operationsMenuService: OperationsMenuService,
    private _authService: AuthService,
  ) {}

  ngOnInit() {
    // $('[data-widget="treeview"]').Treeview('init');
    this.asset = this.util.urlAssets
    this.user = this._authService.getUser()
    this.init()

    const menu = this._authService.getMenu()
    this.addCommandsToMenuItems(menu)
  }

  init() {
    this.items = null
  }

  addCommandsToMenuItems(menu: MenuItem[]) {
    this.model = menu.map((root) => {
      root.items = root.items.map((group) => {
        group.items = group.items.map((item) => {
          return {
            ...item,
            command: () => {
              this.fetchOperationsMenu(item.id)
            },
          }
        })
        return group
      })
      return root
    })
  }

  fetchOperationsMenu(id: any) {
    this._operationsMenuService
      .getOperations(this.user.username, id)
      .subscribe({
        next: (res) => {
          this.items = res
          this.sendToOperationes()
        },
      })
  }

  sendToOperationes() {
    this._operationsService.add({
      items: this.items,
    })
  }
}
