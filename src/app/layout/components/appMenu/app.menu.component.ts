import { commandOperation, CommandOperation } from './../../commands/commands'
import { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { LayoutService } from '../../service/app.layout.service'
import { MenuItem } from 'primeng/api'
import { OpenInTabService } from '../../service/open-in-tab.service'
import { User } from '@core/models'
import { AuthService, GlobalService } from '@core/services'
import { OperationsService } from '../../service/operations.service'
import { consLibColadasPlnMap } from '@pages/cal/lab/cons-liberacion-coladas-planos/component-map'
import { autAsocColadaOfaPlnMap } from '@pages/cal/lab/autorizacion-asoc-colada-ofa-planos/component-map'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = []

  user: User
  items: MenuItem[]
  asset: string

  constructor(
    public util: GlobalService,
    public layoutService: LayoutService,
    public operationsService: OperationsService,
    private _authService: AuthService,
    private _dynamicTab: OpenInTabService,
  ) {}

  ngOnInit() {
    // $('[data-widget="treeview"]').Treeview('init');
    this.asset = this.util.urlAssets
    this.user = this._authService.getUser()
    const menu = this._authService.getMenu()

    // this.model = menu.map( root => {
    //   root.items = root.items.map( group => {
    //     group.items = group.items.map( item => {
    //       return {
    //         ...item,
    //         command: () => {
    //         }
    //       }
    //     })
    //     return group
    //   })
    //   return root
    // })

    this.init()

    this.model = [
      {
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Inventario y Despacho',
            icon: 'pi pi-th-large',
            items: [
              {
                label: 'Prog. y Seg. de Despacho',
                command: () => this.PSD(),
              },
              {
                label: 'Ingresos al Almacén',
              },
              {
                label: 'Gestión de Almacén',
              },
              {
                label: 'Gestión y Control de Inventario',
              },
            ],
          },
          {
            label: 'Calidad',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Laboratorio',
                command: () => this.LAB(),
              },
              {
                label: 'Ingeniería',
              },
            ],
          },
        ],
      },
    ]
  }

  init() {
    this.items = []
    this.operationsService.add({
      items: this.items,
    })
  }

  PSD() {
    this.items = [
      {
        label: 'Despacho Terrestre',
        items: [
          {
            label: 'Ejecución de Programa de Carga Largos',
            command: () => {
              const command : CommandOperation = commandOperation['ejecProgCargaCommand']
              this._dynamicTab.newTab({
                label: 'Ejecución de Programa de Carga Largos',
                ...command
                // componentName: 'AutCargaComponent',
                // componentMap: ejecProgCargaMap
              })
            },
          },
        ],
      },
    ]

    this.sendToOperationes()
  }

  LAB() {
    this.items = [
      {
        label: 'Administración de Análisis Químico',
        expanded: false,
        items: [
          {
            label: 'Liberación de Coladas Planos',
            command: () => {
              this._dynamicTab.newTab({
                label: 'Liberación de Coladas Planos',
                componentName: 'ConsultaLiberacionColadaPlanosComponent',
                componentMap: consLibColadasPlnMap
              })
            },
          },
          {
            label: 'Autorización de Asociación de Colada/Ofa Planos',
            command: () => {
              this._dynamicTab.newTab({
                label: 'Autorización de Asociación de Colada/Ofa Planos',
                componentName: 'AutorizacionAsocColadaOfaPlanosComponent',
                componentMap: autAsocColadaOfaPlnMap
              })
            },
          },
        ],
      },
    ]

    this.sendToOperationes()
  }

  sendToOperationes() {
    this.operationsService.add({
      items: this.items,
    })
  }
}
