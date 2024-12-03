import { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { LayoutService } from '../../service/app.layout.service'
import { MenuItem } from 'primeng/api'
import { OpenInTabService } from '../../service/open-in-tab.service'
import { User } from '@core/models'
import { AuthService, GlobalService } from '@core/services'
import { ejecProgCargaMap } from '@pages/apt/psd/ejecucion-programa-carga/component-map'
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
    private _authService: AuthService,
    public layoutService: LayoutService,
    public operationsService: OperationsService,
    private _dynamicTab: OpenInTabService,
  ) {}

  ngOnInit() {
    // $('[data-widget="treeview"]').Treeview('init');
    this.user = this._authService.user()
    this.asset = this.util.urlAssets
    this.init()

    this.model = [
      {
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Inventario y Despacho',
            icon: 'pi pi-fw pi-user',
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
        label: 'Administración de Catálogos Básicos',
        items: [
          {
            label: 'Marcas de Transporte',
          },
          {
            label: 'Registro de Transportistas',
          },
          {
            label: 'Tolerancia de Báscula',
          },
        ],
      },
      {
        label: 'Despacho Terrestre',
        items: [
          {
            label: 'Ejecución de Programa de Carga Largos',
            component: 'EjecucionProgramaCargaComponent',
            command: () => {
              this._dynamicTab.newTab({
                label: 'Ejecución de Programa de Carga Largos',
                componentName: 'AutCargaComponent',
                componentMap: ejecProgCargaMap
              })
            },
          },
        ],
      },
      {
        label: 'Consulta de Pedidos / Orden de Entrega',
        items: [
          {
            label: 'Consulta de Orden de Entrega',
          },
          {
            label: 'Consulta de Orden de Entrega Programada - Largos',
          },
          {
            label: 'Consulta de Orden Entrega Programada - Planos',
          },
        ],
      },
      {
        label: 'Carga / Descarga en Frente',
        items: [
          {
            label: 'Carga / Descarga en Frente',
          },
          {
            label: 'Carga / Descarga en Frente Planos',
          },
          {
            label: 'Recepción de Material por Transf. Externa Marítima',
          },
          {
            label: 'Recepción de Material por Transf. Externa Terrestre',
          },
        ],
      },
      {
        label: 'Despacho Marítimo',
        items: [
          {
            label: 'Ejecucion del Despacho Maritimo',
          },
          {
            label: 'Administración de Buques',
          },
          {
            label: 'Administración de Embarques',
          },
          {
            label: 'Administración de Eventos',
          },
          {
            label: 'Administración de Subeventos',
          },
          {
            label: 'Registro de Eventos del Embarque',
          },
          {
            label: 'Administración de Mate`s Receipt',
          },
          {
            label: 'Administración de Lista de Carga',
          },
          {
            label: 'Consulta de Listas de Carga',
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
            label: 'Administración de Química de Colada',
          },
          {
            label: 'Administración de Formación de Colada',
          },
          {
            label: 'Liberación de Coladas',
          },
          {
            label: 'Autorización de Asociación de Colada/Ofa',
          },
          {
            label: 'Administración de Química de Comprobación',
          },
          {
            label: 'Autorización o Rechazo de Formación de Coladas',
          },
          {
            label: 'Consulta de Histórico de Movimientos de Coladas',
          },
          {
            label: 'Histórico de Movimientos de Química de Comprobación',
          },
          {
            label: 'Consulta de Coladas por Estado',
          },
          {
            label: 'Administración de Química de Colada Planos',
          },
          {
            label: 'Histórico de Movimientos de Química de Comprobación - Planos',
          },
          {
            label: 'Administración de Química de Comprobación Planos',
          },
          {
            label: 'Consulta de Histórico de Movimientos de Coladas Planos',
          },
          {
            label: 'Consulta de Coladas por Estado Planos',
          },
          {
            label: 'Administración de Formación de Colada Planos',
          },
          {
            label: 'Liberación de Coladas Planos',
            component: 'ConsultaLiberacionColadaPlanosComponent',
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
            component: 'AutorizacionAsocColadaOfaPlanosComponent',
            command: () => {
              this._dynamicTab.newTab({
                label: 'Autorización de Asociación de Colada/Ofa Planos',
                componentName: 'AutorizacionAsocColadaOfaPlanosComponent',
                componentMap: autAsocColadaOfaPlnMap
              })
            },
          },
          {
            label: 'Autorización de Formación de Coladas Planos',
          },
          {
            label: 'Evaluación de Química de Coladas Planos',
          },
        ],
      },
      {
        label: 'Administración de Muestras',
        expanded: false,
        items: [
          {
            label: 'Recepción o Rechazo de Muestras',
          },
          {
            label: 'Creación de Muestras por Excepción - Largos',
          },
          {
            label: 'Consulta de Muestras por Colada',
          },
          {
            label: 'Consulta de Muestras por Ofa',
          },
          {
            label: 'Consulta de Muestras por Ofa Colada',
          },
        ],
      },
      {
        label: 'Administración de Ensayos',
        expanded: false,
        items: [
          {
            label: 'Consulta de Especificaciones por OFA',
          },
          {
            label: 'Administración de Captura de Reensayos',
          },
          {
            label: 'Consulta de Control de Liberación por Ensayos',
          },
          {
            label: 'Copiado Manual Ensayo para OFA de la misma Colada',
          },
          {
            label: 'Resultados de Ensayos por Muestras',
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
