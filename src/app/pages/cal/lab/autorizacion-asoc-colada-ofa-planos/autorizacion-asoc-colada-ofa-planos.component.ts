import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component';
import { AutorizacionAsociacionColadaOFAPlanosService } from '@core/services/lab';
import { AuthService, GlobalService } from '@core/services';
import { Component, Input } from '@angular/core';
import { MDWResponse, User } from '@core/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-autorizacion-asoc-colada-ofa-planos',
  templateUrl: './autorizacion-asoc-colada-ofa-planos.component.html',
  providers: [DatePipe],
})
export class AutorizacionAsocColadaOfaPlanosComponent {
  user: User;
  title: string;
  rows: any[];
  loading: boolean;
  results: MDWResponse = { parametro: {}, tabla1: [] };

  displayHelpColadasxEdo: boolean = false;
  displayHelpDetOFA: boolean = false;
  displayHelpOL: boolean = false;
  backFlag_: boolean = false;

  @Input() hash: number;

  @Input() set data(value: any) {
    if (value) {
      const { params, back } = value;
      this.results.parametro = params;
      this.backFlag_ = back;
      this.title = back ? 'Aut. Asoc Colada' : 'Detalle';
      this.consult();
    }
  }

  constructor(
    private _util: GlobalService,
    private _authService: AuthService,
    private _dynamicTabs: DynamicTabsComponent,
    private _autAsocColadaOFAPlanosService: AutorizacionAsociacionColadaOFAPlanosService
  ) {
    this.user = this._authService.getUser();
  }

  filter(res: MDWResponse) {
    return res.tabla1.filter((x) => x.C_LOTE !== '');
  }

  success(res) {
    const aux = this.filter(res);
    this.results = res;
    this.rows = aux;
  }

  getAll() {
    this.loading = true;

    this._autAsocColadaOFAPlanosService
      .get(this.results)
      .subscribe({
        next: (res) => this.success(res),
        error: (err) => console.log(err),
      })
      .add(() => {
        this.loading = false;
      });
  }

  consult() {
    const aux = { ...this.results.parametro };

    this.results = {
      parametro: {
        PAG: '',
        ACCION: 'C',
        W_ISN: '',
        PAR_IMPRE: '',
        PAR_IDEN: this.user.username,
        C_COLADA: this._util.validate(aux.C_COLADA),
        M_ESTADO: this._util.validate(aux.M_ESTADO),
        C_TIPO_ACERO: this._util.validate(aux.C_TIPO_ACERO),
        N_VERSIO_ACERO: this._util.validate(aux.N_VERSIO_ACERO),
      },
    };

    this.getAll();
  }

  updateFlag(): boolean {
    return !(this.results.parametro.W_C_MENSA == '000');
  }

  addFlag(): boolean {
    return !(this.results.parametro.W_C_MENSA == '005');
  }

  back() {
    this._dynamicTabs.back(this.hash);
  }

  displayChangeCxE(value: boolean) {
    this.displayHelpColadasxEdo = value;
  }

  selectedHelpCxE(value) {
    this.results.parametro.M_ESTADO = value.D_REDUCI_EDO_COLADA;
    this.results.parametro.C_TIPO_ACERO = value.C_TIPO_ACERO;
    this.results.parametro.N_VERSIO_ACERO = value.N_VERSIO_ACERO;
    this.results.parametro.C_COLADA = value.C_COLADA;
  }

  displayChangeDetOFA(value: boolean) {
    this.displayHelpDetOFA = value;
  }

  selectedHelpDetOFA(value: any) {
    this.results.parametro.C_COLADA = value.C_COLADA;
  }
}
