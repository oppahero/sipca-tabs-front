import { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { LayoutService } from '../../service/app.layout.service'
import { MenuItem } from 'primeng/api'
import { OpenInTabService } from '../../service/open-in-tab.service'
import { User } from '@core/models'
import { AuthService, GlobalService } from '@core/services'
import { ejecProgCargaMap } from '@pages/apt/psd/ejecucion-programa-carga/component-map'

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
    private _dynamicTab: OpenInTabService,
    public layoutService: LayoutService,
    private _authService: AuthService
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
                // icon: 'pi pi-fw pi-sign-in',
                // routerLink: ['apt/psd'],
                // routerLinkActiveOptions: '{ exact: false }',
                command: () => {
                  this.PSD()
                },
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
        ],
      },
    ]
  }

  init() {
    this.items = []
    this.util.newMessage({
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
            // routerLink: 'apt/psd/marcas-trspt',
          },
          {
            label: 'Registro de Transportistas',
            // routerLink: 'apt/psd/reg-trp',
          },
          {
            label: 'Tolerancia de Báscula',
            // routerLink: 'apt/psd/tole-bascu',
          },
        ],
      },
      {
        label: 'Despacho Terrestre',
        items: [
          {
            label: 'Ejecución de Programa de Carga Largos',
            // routerLink: 'apt/psd/prog-carga-largo',
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
            // routerLink: 'apt/psd/orden-entrega',
          },
          {
            label: 'Consulta de Orden de Entrega Programada - Largos',
            // routerLink: 'apt/psd/orden-entrega-programada-largos',
          },
          {
            label: 'Consulta de Orden Entrega Programada - Planos',
            // routerLink: 'apt/psd/orden-entrega-programada-planos',
          },
        ],
      },
      {
        label: 'Carga / Descarga en Frente',
        items: [
          {
            label: 'Carga / Descarga en Frente',
            // routerLink: 'apt/psd/carga-descarga-fte',
          },
          {
            label: 'Carga / Descarga en Frente Planos',
            // routerLink: 'apt/psd/cargaDescFtePlanos',
          },
          {
            label: 'Recepción de Material por Transf. Externa Marítima',
            // routerLink: 'apt/psd/recepMaterialMaritimo',
          },
          {
            label: 'Recepción de Material por Transf. Externa Terrestre',
            // routerLink: 'apt/psd/recepMaterialTerrestre',
          },
        ],
      },
      {
        label: 'Despacho Marítimo',
        items: [
          {
            label: 'Ejecucion del Despacho Maritimo',
            // routerLink: 'apt/psd/ejecucion-despacho-maritimo',
          },
          {
            label: 'Administración de Buques',
            // routerLink: 'apt/psd/admin-buques',
          },
          {
            label: 'Administración de Embarques',
            // routerLink: 'apt/psd/adminEmbarques',
          },
          {
            label: 'Administración de Eventos',
            // routerLink: 'apt/psd/admin-evento',
          },
          {
            label: 'Administración de Subeventos',
            // routerLink: 'apt/psd/admin-subevento',
          },
          {
            label: 'Registro de Eventos del Embarque',
            // routerLink: 'apt/psd/reg-eventos-embarque',
          },
          {
            label: 'Administración de Mate`s Receipt',
            // routerLink: 'apt/psd/adm-mates-receipt',
          },
          {
            label: 'Administración de Lista de Carga',
            // routerLink: 'apt/psd/administracion-listas-carga',
          },
          {
            label: 'Consulta de Listas de Carga',
            // routerLink: 'apt/psd/cons-listas-carga',
          },
        ],
      },
    ]

    this.util.newMessage({
      items: this.items,
    })
  }
}
