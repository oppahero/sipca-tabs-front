import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component'
import { AuthService, GlobalService } from '@core/services'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, Input } from '@angular/core'
import { MDWResponse, User } from '@core/models'
import { DatePipe } from '@angular/common'

import {
  EvaluacionColadasPlanosService,
  AutFormacionColadasPlanosService,
  AutorizacionAsociacionColadaOFAPlanosService,
} from '@core/services/lab'

@Component({
  selector: 'app-autorizacion-asoc-colada-ofa-planos',
  templateUrl: './autorizacion-asoc-colada-ofa-planos.component.html',
  providers: [DatePipe],
})
export class AutorizacionAsocColadaOfaPlanosComponent {
  user: User
  title: string
  rows: any[]
  loading: boolean
  results: MDWResponse = { parametro: {}, tabla: [] }
  flagUpdate: boolean = false
  flagAdd: boolean = false
  selected: any

  saveParam: any = { parametro: {} }

  displayHelpColadasxEdo: boolean = false
  displayHelpDetOFA: boolean = false
  displayHelpOL: boolean = false

  ofa: any = ''
  lote: any = ''
  backFlag_: boolean = false

  @Input() hash: number

  @Input() set data(value: any) {
    if (value) {
      const { params , back } = value
      this.results.parametro = params
      this.backFlag_ = back
      this.consult()
    }
  }

  constructor(
    private _router: Router,
    private _util: GlobalService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _autAsocColadaOFAPlanosService: AutorizacionAsociacionColadaOFAPlanosService,
    private _autFormacionColadasPlanosService: AutFormacionColadasPlanosService,
    private _evaluacionColadasPlanosService: EvaluacionColadasPlanosService,
    private _dynamicTabs: DynamicTabsComponent
  ) {
    this.title = 'Detalle'

    this.results.parametro = {
      C_CIA: '01',
      C_SISTEMA: 'LAB',
    }
  }

  PosicionFila(OFA, LOTE) {
    this.lote = LOTE
    this.ofa = OFA
  }

  filter(results): any {
    return results['tabla'].filter((x) => x.C_LOTE != '')
  }

  success(results) {
    const aux = this.filter(results)
    this.results = results
    this.results.parametro.N_VERSIO_ACERO = parseInt(
      this._util.formatNumber(this.results.parametro.N_VERSIO_ACERO, 0, 2)
    )
    this.rows = aux
    this.loading = false

    if (this.results.parametro.W_C_MENSA == '206') {
      this.clean()
    } else {
      if (this.results.parametro.W_C_MENSA == '005') {
        this.rows = []
      }
    }
  }

  clean() {
    this.results.parametro.C_COLADA = ''
    this.results.parametro.C_TIPO_ACERO = ''
    this.results.parametro.M_ESTADO = ''
    this.results.parametro.N_VERSIO_ACERO = ''
    this.rows = []
  }

  getAll() {
    this.loading = true

    this._autAsocColadaOFAPlanosService
      .getAll(this.results)
      .toPromise()
      .then((results) => {
        this.success(results)
      })
      .catch((err) => {
        console.log(err)
        this.loading = false
      })
  }

  consult() {
    this.user = this._authService.getUser()

    const aux = { ...this.results.parametro }

    this.results.parametro = {
      PAG: '',
      ACCION: 'C',
      W_ISN: '',
      PAR_IMPRE: '',
      PAR_IDEN: this.user.username,
      C_COLADA: this._util.validate(aux.C_COLADA),
      M_ESTADO: this._util.validate(aux.M_ESTADO),
      C_TIPO_ACERO: this._util.validate(aux.C_TIPO_ACERO),
      N_VERSIO_ACERO: this._util.validate(aux.N_VERSIO_ACERO),
    }
    this.getAll()
  }

  updateFlag(): boolean {
    return  !(this.results.parametro.W_C_MENSA == '000')
  }

  addFlag(): boolean {
    return  !(this.results.parametro.W_C_MENSA == '005')
  }

  alta() {
    this.saveParams()
    this._router.navigate(['alta'], { relativeTo: this._activatedRoute })
  }

  modificar() {
    this.saveParams()
    this._router.navigate(['modificar'], { relativeTo: this._activatedRoute })
  }

  back() {

    this._dynamicTabs.back(this.hash)

    // if (this._autAsocColadaOFAPlanosService.getBackFlagAfc() == true) {
    //   this._autFormacionColadasPlanosService.setColada(
    //     this.results.parametro.C_COLADA
    //   )
    //   this._autAsocColadaOFAPlanosService.setBackFlagAfc(false)
    //   this._router.navigate(['/cal/lab/autorizacion-formacion-coladas-planos'])
    // } else {
    //   if (this._autAsocColadaOFAPlanosService.getBackFlagEvalCdaP() == true) {
    //     this._evaluacionColadasPlanosService.setParams(
    //       this.results.parametro.C_COLADA
    //     )
    //     this._autAsocColadaOFAPlanosService.setBackFlaEvalCdaP(false)
    //     this._autAsocColadaOFAPlanosService.setParams('')
    //     this._router.navigate(['/cal/lab/evaluacion-coladas-planos'])
    //   } else {
    //     this._location.back()
    //     this._autAsocColadaOFAPlanosService.setBackFlag(false)
    //   }
    // }
  }

  saveParams() {
    // this._autAsocColadaOFAPlanosService.setParams(this.results.parametro)

    // this._autAsocColadaOFAPlanosService.setTabla(this.rows)

    // if (this.selected) {
    //   this._autAsocColadaOFAPlanosService.setTabla(this.rows)
    // }
  }

  /** Manejadores del dialog colada de estado*/
  displayChangeCxE(value: boolean) {
    this.displayHelpColadasxEdo = value
  }

  selectedHelpCxE(value) {
    this.results.parametro.M_ESTADO = value.D_REDUCI_EDO_COLADA
    this.results.parametro.C_TIPO_ACERO = value.C_TIPO_ACERO
    this.results.parametro.N_VERSIO_ACERO = value.N_VERSIO_ACERO
    this.results.parametro.C_COLADA = value.C_COLADA
  }

  /** Manejadores del dialog detalle coladas OFA*/
  displayChangeDetOFA(value: boolean) {
    this.displayHelpDetOFA = value
    this.saveParams()
  }

  selectedHelpDetOFA(value: any) {
    this.results.parametro.C_COLADA = value.C_COLADA
  }

  navigate(route) {
    this.saveParams()
    this._router.navigate([route], { relativeTo: this._activatedRoute })
  }
}
