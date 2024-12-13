import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ConfirmDialogComponent } from '@shared/components'
import { AuthService, GlobalService } from '@core/services'
import { Column, MDWResponse, User } from '@core/models'
import { Router } from '@angular/router'
import {
  ConsLiberacionColadaPlanosService,
  ConsLiberacionColadaPlanosMttoService,
  AutorizacionAsociacionColadaOFAPlanosService,
} from '@core/services/lab'

@Component({
  selector: 'app-cons-liberacion-colada-planos',
  templateUrl: './cons-liberacion-colada-planos.component.html',
})
export class ConsultaLiberacionColadaPlanosComponent implements OnInit {
  user: User
  title: string
  cols: Column[]
  rows: any[]
  loading: boolean

  results: MDWResponse = { parametro: {}, tabla1: [], tabla2: [] }
  selected: any
  displayHelpColadasxEdo: boolean = false
  selectedEC: any = {}
  estadoColadas: any = []

  tipoMensa: string
  mensa: string
  liberaFlag: boolean = false
  resultsLiberar: any = { parametro: {} }
  inventoryGroup: any = []
  combo: any = { parametro: {} }
  saveParam: any = { parametro: {} }

  C_COLADA_I: string
  CC_EDO_COLADA: string
  PAG: any
  PAG_N: any = 0

  @ViewChild(ConfirmDialogComponent) confirm: ConfirmDialogComponent

  @Input() hash: number

  @Input() set data(value: any) {

    if (value) {
      console.log('Liberacion colada', value)
      const { params } = value
      this.results.parametro = params
    }
  }

  constructor(
    private _router: Router,
    private _util: GlobalService,
    private _authService: AuthService,
    private _dynamicTabs: DynamicTabsComponent,
    private _consLiberacionColadaPlanosService: ConsLiberacionColadaPlanosService,
    private _autorizacionAsociacionColadaOFAPlanosService: AutorizacionAsociacionColadaOFAPlanosService,
    private _consLiberacionColadaPlanosMttoService: ConsLiberacionColadaPlanosMttoService
  ) {
    this.title = 'Detalle'

    this.results.parametro = {
      C_CIA: '01',
      C_SISTEMA: 'LAB',
    }
  }

  ngOnInit(): void {
    this.setCols()
    this.liberaFlag = false

    this.results.parametro =
      this._consLiberacionColadaPlanosService.getParams()

    this.user = this._authService.getUser()
    this.results.parametro.PAR_IDEN = this.user.username

    if (this._consLiberacionColadaPlanosService.getParams()) {
      this.getAll()
    } else {
      this.consult()
    }
  }

  setCols() {
    this.cols = [
      { field: 'C_COLADA' },
      { field: 'C_TIPO_ACERO' },
      { field: 'N_VERSIO_ACERO' },
      { field: 'D_RESUL_ENSAY' },
    ]
  }

  dropdowns() {
    this.results.parametro.CC_EDO_COLADA = this.selectedEC
      ? this.selectedEC.C_ERR
      : ''
  }

  dropdownEC(results: any) {
    if (results['tabla2']) {
      this.estadoColadas = results['tabla2'].filter(
        (x) => x.DD_COLUM_COMBO != ''
      )
      this.results.parametro.C_ERR = this.selectedEC.CC_COLUM_COMBO
    }
  }

  filter(results: MDWResponse): any {
    return results['tabla1'].filter((x) => x.C_COLADA != '')
  }

  formatCols(aux) {
    return aux.map((p) => {
      if (p.N_VERSIO_ACERO)
        p['N_VERSIO_ACERO'] = parseInt(
          this._util.formatNumber(p.N_VERSIO_ACERO, 1, 2)
        )

      return p
    })
  }

  success(response: MDWResponse) {
    const aux = this.filter(response)
    this.results.parametro = response.parametro

    this.rows = aux ? this.formatCols(aux) : aux

    if (aux) this.selected = this.rows[0]

    if (this.liberaFlag == true) {
      this.results.parametro.W_TIPO_MENSA = this.tipoMensa
      this.results.parametro.W_MENSA = this.mensa
      this.liberaFlag = false
    }
  }

  catchError(err) {
    console.log(err)
  }

  getAll() {
    this.loading = true

    this._consLiberacionColadaPlanosService.getAll(this.results).subscribe({
      next: (res) => {
        this.success(res)
        this.dropdownEC(res)
      },
      error: (err: Error) => this.catchError(err),
      complete: () => {
        this.loading = false
      },
    })
  }

  libera() {
    this.loading = true

    this._consLiberacionColadaPlanosMttoService
      .getAll(this.resultsLiberar)
      .subscribe({
        next: (res) => {
          this.loading = false
          this.liberaFlag = true
          this.tipoMensa = res.parametro.W_TIPO_MENSA
          this.mensa = res.parametro.W_MENSA
          this.getAll()
        },
        error: (err: Error) => this.catchError(err),
        complete: () => {
          this.loading = false
        },
      })
  }

  consult() {
    this.selected = null

    const aux = { ...this.results.parametro }

    this.results.parametro = {
      PAG: '',
      ACCION: '',
      W_ISN: '',
      PAR_IMPRE: '',
      PAR_IDEN: this.user.username,
      C_COLADA_I: this._util.validate(aux.C_COLADA_I),
    }

    this.getAll()
  }

  nextPageFlag(): boolean {
    return !(
      this.results.parametro.W_MENSA == '42 ** CONTINUA' ||
      this.results.parametro.W_MENSA == '504 ** COLADA LIBERADA **'
    )
  }

  liberarFlag() {
    return !this.selected
  }

  nextPage() {
    const aux = { ...this.results.parametro }

    this.results = {
      parametro: {
        PAR_IDEN: this.user.username,
        PAG: this._util.validate(aux.PAG),
        W_INI_CONSU: aux.W_PRIM_LIN,
        W_CLAVE_CDA: aux.W_PRIM_LIN,
      },
    }
    this.getAll()
  }

  libercond() {
    const aux = this.results.parametro.PAG - 1
    const pag = this._util.formatNumberToString(aux.toString(), 3, 0)

    const params = {
      PAG: pag,
      W_CLAVE_CDA: this._util.validate(this.results.parametro.W_INI_CONSU),
    }

    this._dynamicTabs.setDataOnComponentActive(this.hash, { params: params })

    this._dynamicTabs.navigateTo(
      this.hash,
      'AutorizacionAsocColadaOfaPlanosComponent',
      {
        params: { C_COLADA: this.selected?.C_COLADA ?? '' },
        back: true
      }
    )

    // this.saveParams()
    // this._router.navigate(['/cal/lab/autorizacion-asoc-colada-ofa-planos'])
    // this._autorizacionAsociacionColadaOFAPlanosService.setBackFlag(true)
  }

  confirmDialog() {
    this.confirm.show('¿Está seguro que desea continuar?', 'liberar')
  }

  confirmDialogAccept(key) {
    switch (key) {
    case 'liberar':
      this.liberar()
      break
    }
  }

  liberar() {
    const aux = { ...this.results.parametro }

    this.resultsLiberar.parametro = {
      PAG: this._util.validate(aux.PAG),
      PAR_IDEN: this.user.username,
      W_ACCION_ANT: 'C',
      W_CONFIRMA: 'S',
      C_COLADA: this._util.validate(this.selected.C_COLADA),
      W_INI_CONSU: this._util.validate(aux.W_CLAVE_CDA),
      W_CLAVE_CDA: this._util.validate(aux.W_CLAVE_CDA),
    }

    this.libera()
    this.PAG_N = this.resultsLiberar.parametro.PAG - 1
    this.PAG = this._util.formatNumberToString(this.PAG_N.toString(), 3, 0)

    this.results.parametro = {
      PAG: this._util.validate(this.PAG),
      ACCION: '',
      W_ISN: '',
      PAR_IMPRE: '',
      PAR_IDEN: this.user.username,
      W_CLAVE_CDA: this._util.validate(
        this.resultsLiberar.parametro.W_INI_CONSU
      ),
    }
  }

  saveParams() {
    this.PAG_N = this.results.parametro.PAG - 1
    this.PAG = this._util.formatNumberToString(this.PAG_N.toString(), 3, 0)

    this._consLiberacionColadaPlanosService.setParams({
      PAG: this._util.validate(this.PAG),
      ACCION: '',
      W_ISN: '',
      PAR_IMPRE: '',
      PAR_IDEN: this.user.username,
      W_CLAVE_CDA: this._util.validate(this.results.parametro.W_INI_CONSU),
    })

    if (this.selected) {
      this._autorizacionAsociacionColadaOFAPlanosService.setParams({
        C_COLADA: this.selected.C_COLADA,
      })
    }
  }

  displayChangeCxE(value: boolean) {
    this.displayHelpColadasxEdo = value
  }

  selectedHelpCxE(value: any) {
    this.results.parametro.CC_COLADA = value.CC_COLADA
  }
}
