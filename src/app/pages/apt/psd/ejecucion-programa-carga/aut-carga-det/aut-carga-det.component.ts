import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { AutCargaLargosDetService } from '@core/services/apt'
import { AuthService, GlobalService } from '@core/services'
import { Column, MDWResponse, User} from '@core/models'
import { ToastComponent } from '@shared/components'

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

  @ViewChild(ToastComponent) toast: ToastComponent

  @Input() hash : number

  @Input() set data(value: any) {
    console.log('DATA en det', value)

    if(value)
      this.results.parametro.N_SECUEN_PROG = value

    this.consult()
  }

  constructor(
    private _util: GlobalService,
    private _authService: AuthService,
    private _dynamicTabs: DynamicTabsComponent,
    private _autCargaDetService: AutCargaLargosDetService,
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

  notification(aux: string, mssg: string) {
    switch (aux) {
    case 'FE':
      this.toast.showError(mssg)
      break
    case 'WA':
      this.toast.showWarn(mssg)
      break
    default:
      this.toast.showSuccess(mssg)
      break
    }
  }

  success(response: MDWResponse) {
    this.rows = this.filter(response)
    this.results.parametro = response['parametro']
    this.notification(
      response.parametro.W_TIPO_MENSA,
      response.parametro.W_MENSA
    )
  }

  catchError(err) {
    console.log(err)
    this.toast.showError('Ha ocurrido un error.')
  }

  get() {
    this.loading = true

    this._autCargaDetService
      .getAll(this.results)
      .subscribe({
        next: (res) =>this.success(res),
        error: (err: Error) => this.catchError(err),
        complete: () => this.loading = false
      })
  }

  consult() {

    const { N_SECUEN_PROG } = this.results.parametro

    this.user = this._authService.getUser()

    this.results.parametro = {
      PAR_IDEN: this.user?.username || '',
      N_SECUEN_PROG_MDW: this._util.validate(N_SECUEN_PROG)
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
