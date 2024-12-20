import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component'
import { Component, Input, OnInit } from '@angular/core'
import { AutCargaLargosDetService } from '@core/services/apt'
import { AuthService, GlobalService } from '@core/services'
import { Column, MDWResponse, User } from '@core/models'

@Component({
  selector: 'app-aut-carga-det',
  templateUrl: './aut-carga-det.component.html',
})
export class AutCargaDetComponent implements OnInit {
  user: User
  title: string
  cols: Column[]
  rows: any[]
  results: MDWResponse = { parametro: {}, tabla: [] }
  loading = false

  @Input() hash: number

  @Input() set data(value: any) {
    if (value) this.results.parametro.N_SECUEN_PROG = value

    this.consult()
  }

  constructor(
    private _util: GlobalService,
    private _authService: AuthService,
    private _dynamicTabs: DynamicTabsComponent,
    private _autCargaDetService: AutCargaLargosDetService
  ) {
    this.title = 'Autorización Carga - Detalle'
  }

  ngOnInit(): void {
    this.setCols()
  }

  setCols() {
    this.cols = [
      { field: 'CC_ORDEN_ENTREGA_MDW', header: 'Orden de Entrega' },
      { field: 'CC_POS_ODESP_MDW', header: 'Pos. Orden' },
      { field: 'CC_PEDIDO_MDW', header: 'Pedido' },
      { field: 'CC_POS_MDW', header: 'Pos. Pedido' },
      { field: 'NN_GUIA_DESP', header: 'Guía de Despacho' },
      { field: 'FF_CARGA', header: 'Fecha Progdo.' },
      { field: 'HH_CARGA_PROG', header: 'Hora Inicio Progdo.' },
      { field: 'HH_FINAL_PROG', header: 'Hora Fin Progdo.' },
      { field: 'DD_PRODUCTO', header: 'Producto' },
      { field: 'CC_TIPO_ACERO', header: 'Tipo de Acero' },
      { field: 'DD_NOR', header: 'Norma' },
      { field: 'DD_SUBNOR', header: 'SubNorma' },
      { field: 'CC_GRADO_ACERO', header: 'Grado Acero' },
      { field: 'CC_DESIGN_NOR', header: 'Designación Norma' },
      { field: 'QQ_DIAM', header: 'Diámetro (mm)' },
      { field: 'QQ_ANCHO', header: 'Ancho' },
      { field: 'QQ_ESPES', header: 'Espesor' },
      { field: 'QQ_LONG', header: 'Longitud' },
      { field: 'QQ_DIAM_PLG', header: 'Diámetro (plg)' },
      { field: 'QQ_CARGA', header: 'Peso Progdo. (kg)' },
    ]
  }

  filter(results): object[] {
    return results['tabla'].filter((x) => x.CC_ORDEN_ENTREGA_MDW != '')
  }

  success(response: MDWResponse) {
    this.rows = this.filter(response)
    this.results.parametro = response['parametro']
  }

  catchError(err) {
    console.log(err)
  }

  get() {
    this.loading = true

    this._autCargaDetService.get(this.results).subscribe({
      next: (res) => this.success(res),
      error: (err) => this.catchError(err),
      complete: () => (this.loading = false),
    })
  }

  consult() {
    const { N_SECUEN_PROG } = this.results.parametro

    this.user = this._authService.getUser()

    this.results.parametro = {
      PAR_IDEN: this.user?.username || '',
      N_SECUEN_PROG_MDW: this._util.validate(N_SECUEN_PROG),
    }

    this.get()
  }

  nextPageFlag(): boolean {
    return this.results.parametro.W_C_MENSA !== '010'
  }

  back() {
    this._dynamicTabs.back(this.hash)
  }
}
