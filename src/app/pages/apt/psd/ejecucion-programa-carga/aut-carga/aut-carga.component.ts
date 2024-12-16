import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component'
import { ConfirmDialogComponent, ToastComponent } from '@shared/components'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { AuthService, GlobalService } from '@core/services'
import { ActivatedRoute, Router } from '@angular/router'
import { Column, MDWResponse, User } from '@core/models'
import { DatePipe } from '@angular/common'
import {
  AutCargaLargosService,
  AutCargaLargosCanService,
  AutCargaLargosConfirService,
} from '@core/services/apt'

@Component({
  selector: 'app-aut-carga',
  templateUrl: './aut-carga.component.html',
  providers: [DatePipe],
})
export class AutCargaComponent implements OnInit {
  user: User
  title: string
  cols: Column[]
  rows: any[]
  selected: any

  results: MDWResponse = { parametro: {}, tabla: [] }
  date: Date

  loading = false
  displayHelp = false

  @ViewChild(ToastComponent) toast: ToastComponent
  @ViewChild(ConfirmDialogComponent) confirm: ConfirmDialogComponent

  @Input() hash: number

  @Input() set data(value: any) {
    if (value) {
      const { params, date } = value
      this.results.parametro = params
      this.date = date
    }
  }

  constructor(
    private _router: Router,
    private _datePipe: DatePipe,
    private _util: GlobalService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _autCargaService: AutCargaLargosService,
    private _autCargaCanService: AutCargaLargosCanService,
    private _autCargaConfirService: AutCargaLargosConfirService,
    private _dynamicTabs: DynamicTabsComponent
  ) {
    this.title = 'Ejecución de Programa de Carga - Autorización Carga'
  }

  ngOnInit() {
    this.user = this._authService.getUser()
    this.setCols()
    this.consult()
  }

  setCols() {
    this.cols = [
      { field: 'NN_SECUEN_VIAJE', header: 'Sec. Despacho' },
      { field: 'NN_SECUEN_PROG', header: 'Autorización Carga' },
      { field: 'CC_ORDEN_DESP', header: 'Orden de Entrega' },
      { field: 'CC_POS_ODESP', header: 'Posición' },
      { field: 'DD_CLI_DESTINO', header: 'Cliente Destino' },
      { field: 'CC_COND_ENTREG', header: 'Cond. Entrega' },
      { field: 'DD_PUERTO', header: 'Pto. Destino' },
      { field: 'DD_PRODUCTO', header: 'Producto' },
      { field: 'QQ_CARGA_PROG', header: 'Peso Prgdo. (Kg)' },
      { field: 'QQ_CARGA_DESP', header: 'Peso Neto Desp. (Kg)' },
      { field: 'FF_CARGA', header: 'Fecha Prgdo.' },
      { field: 'HH_CARGA', header: 'Hora Prgdo.' },
      { field: 'CC_PROG_DESP', header: 'Programa' },
      { field: 'DD_EDO_PROG', header: 'Edo. Autorización' },
      { field: 'DD_TIPO_VIAJE', header: 'Tipo Viaje' },
      { field: 'DD_CIA_TRANSPORTE', header: 'Cía. Transportista' },
      { field: 'DD_NOMBRE_COND', header: 'Conductor' },
      { field: 'CC_TRSP_MOVIL', header: 'Placa Móvil' },
      { field: 'CC_TRSP_CARGA', header: 'Placa Carga' },
      { field: 'MM_IND_ELAB', header: 'Origen' },
    ]
  }

  filter(results: MDWResponse): object[] {
    return results['tabla'].filter((x) => x.NN_SECUEN_VIAJE != '')
  }

  success(response: MDWResponse) {
    this.rows = this.filter(response)
    this.results.parametro = response.parametro

    if (this.rows.length) this.selected = this.rows[0]
  }

  catchError(err) {
    console.log(err)
  }

  getAll() {
    this.loading = true

    this._autCargaService.getAll(this.results).subscribe({
      next: (res) => this.success(res),
      error: (err) => this.catchError(err),
      complete: () => {
        this.loading = false
      },
    })
  }

  consult() {
    this.selected = null
    const aux = { ...this.results.parametro }
    const date = this._datePipe.transform(this.date, 'yyyyMMdd')

    this.results.parametro = {
      PAR_IDEN: this.user?.username,
      C_GRP_ALM: this._util.validate(aux.C_GRP_ALM),
      N_PROG_DESP: this._util.validate(aux.N_PROG_DESP),
      F_CARGA: this._util.validate(date),
      N_SECUEN_PROG_MDW: this._util.validate(aux.N_SECUEN_PROG_MDW),
      C_EDO_PROG_MDW: this._util.validate(aux.C_EDO_PROG_MDW),
      PAG: '',
      ACCION: '',
      W_ISN: '',
      W_INI_CONSU1: '',
      W_INI_CONSU2: '',
      W_INI_CONSU3: '',
      W_PRIM_LIN_SEC: '',
      W_PRIM_LIN_EDO: '',
      W_PRIM_LIN_FEC: '',
      W_PIRM_LIN_C_PROG: '',
      W_INI_CONSU_C_PROG: '',
      N_SECUEN_VIAJE: '',
    }

    this.getAll()
  }

  refreshConsult(results) {
    if (
      results.parametro.W_TIPO_MENSA === '' ||
      results.parametro.W_TIPO_MENSA === 'IN'
    )
      this.consult()
  }

  successCs(results) {
    // this.notification(
    //   results.parametro.W_TIPO_MENSA,
    //   results.parametro.W_MENSA
    // )

    this.refreshConsult(results)
  }

  paramsCs(action: string, wValida: string, nnSecuen) {
    return {
      parametro: {
        ACCION: action,
        W_VALIDA: wValida,
        NN_SECUEN_PROG: nnSecuen,
        PAR_IDEN: this.user.username,
      },
    }
  }

  cancel() {
    const params = this.paramsCs('X', 'X', this.selected.NN_SECUEN_PROG)
    this.loading = true

    this._autCargaCanService.cancel(params).subscribe({
      next: (results) => this.successCs(results),
      error: (err) => this.catchError(err),
      complete: () => (this.loading = false),
    })
  }

  confirmation() {
    const params = this.paramsCs('P', 'X', this.selected.NN_SECUEN_PROG)
    this.loading = true

    this._autCargaConfirService.confirm(params).subscribe({
      next: (results) => this.successCs(results),
      error: (err) => this.catchError(err),
      complete: () => (this.loading = false),
    })
  }

  nextPage() {
    this.results.parametro.ACCION = 'S'
    this.getAll()
  }

  nextPageFlag(): boolean {
    return !(this.results.parametro.W_C_MENSA === '010')
  }

  // devFrente - confirmación
  devFrenteFlag(): boolean {
    return !(
      this.results.parametro.C_EDO_PROG_MDW === '03' &&
      this.selected &&
      this.selected.CC_EDO_PROG === '03'
    )
  }

  // reordenar - cancelar
  rearrangeFLag(): boolean {
    return !(
      this.results.parametro.C_EDO_PROG_MDW === '09' &&
      this.selected &&
      this.selected.CC_EDO_PROG === '09'
    )
  }

  reprintFlag(): boolean {
    return !(
      this.results.parametro.C_EDO_PROG_MDW !== '09' &&
      this.selected &&
      this.selected.CC_EDO_PROG !== '09'
    )
  }

  detail() {
    this._dynamicTabs.setDataOnComponentActive(this.hash, {
      params: this.results.parametro,
      date: this.date,
    })

    this._dynamicTabs.navigateTo(
      this.hash,
      'AutCargaDetComponent',
      this.selected.NN_SECUEN_PROG
    )
  }

  devFrent() {
    this.navigate('devFrente', this.selected.NN_SECUEN_PROG)
  }

  tracking() {
    this.navigate('seguimiento', this.selected.NN_SECUEN_PROG)
  }

  rearrange() {
    this.navigate('reordenar', this.results.parametro.C_EDO_PROG_MDW)
  }

  reprint() {
    this.navigate('reimp', this.selected.NN_SECUEN_PROG)
  }

  register() {
    this._router.navigate(['alta'], { relativeTo: this._activatedRoute })
  }

  externalCenterOffice() {
    this._router.navigate(['despachoCExt'], {
      relativeTo: this._activatedRoute,
    })
  }

  saveParams() {
    this._autCargaService.setParams(this.results.parametro)
    this._autCargaService.setDate(this.date)
  }

  navigate(route: string, value: any) {
    this.saveParams()
    this._router.navigate([route, value], {
      relativeTo: this._activatedRoute,
    })
  }

  /** Manejadores del dialog */

  displayChange(value: boolean) {
    this.displayHelp = value
  }

  selectedHelp(value: any) {
    this.results.parametro.C_EDO_PROG_MDW = this._util.fillWithCeros(
      value.NN_EDO_PROG,
      2
    )
    this.results.parametro.D_EDO_PROG = value.DD_EDO_PROG
  }

  selectedRow(value: any) {
    this.selected = value
  }

  /** Confirms Dialog */

  confirmDialog() {
    this.confirm.show('¿Está seguro que desea confirmar la carga?', 'confirm')
  }

  cancelDialog() {
    this.confirm.show(
      '¿Está seguro que desea cancelar la Autorización?',
      'cancel'
    )
  }

  confirmDialogAccept(key: string) {
    switch (key) {
    case 'confirm':
      this.confirmation()
      break
    default:
      this.cancel()
      break
    }
  }
}
