import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '@shared/components';
import { AuthService, GlobalService } from '@core/services';
import { Column, MDWResponse, User } from '@core/models';
import {
  ConsLiberacionColadaPlanosService,
  ConsLiberacionColadaPlanosMttoService,
} from '@core/services/lab';

const mockData = [
   {
    C_COLADA: 'CLD-001',
    C_TIPO_ACERO: 'Acero Inoxidable',
    N_VERSION_ACERO: 1,
    D_RESUL_ENSAY: 'Aprobado'
  }
]

@Component({
  selector: 'app-cons-liberacion-colada-planos',
  templateUrl: './cons-liberacion-colada-planos.component.html',
})
export class ConsultaLiberacionColadaPlanosComponent implements OnInit {
  user: User;
  title: string;
  cols: Column[];
  rows: any[] = mockData  // Para demo
  loading: boolean;
  results: MDWResponse = { parametro: {}, tabla1: [], tabla2: [] };
  selected: any;
  displayHelpColadasxEdo: boolean
  liberaFlag: boolean

  @ViewChild(ConfirmDialogComponent) confirm: ConfirmDialogComponent;

  @Input() hash: number;

  @Input() set data(value: any) {
    if (value) {
      const { params } = value;
      this.results.parametro = params;
    }
  }

  constructor(
    private _util: GlobalService,
    private _authService: AuthService,
    private _dynamicTabs: DynamicTabsComponent,
    private _consLiberacionColadaPlanosService: ConsLiberacionColadaPlanosService,
  ) {
    this.user = this._authService.getUser();
    this.title = 'Detalle';
  }

  ngOnInit(): void {
    this.setCols();
    this.selected = this.rows[0];
  }

  setCols() {
    this.cols = [
      { field: 'C_COLADA', header: 'Colada' },
      { field: 'C_TIPO_ACERO', header: 'Tipo Acero' },
      { field: 'N_VERSIO_ACERO', header: 'Versión Acero' },
      { field: 'D_RESUL_ENSAY', header: 'Resultado Ensayo' },
    ];
  }

  filter(res: MDWResponse) {
    return res.tabla1.filter((x) => x.C_COLADA !== '');
  }

  success(response: MDWResponse) {
    const aux = this.filter(response);
    this.results.parametro = response.parametro;
    this.rows = aux;
  }

  get() {
    this.loading = true;

    this._consLiberacionColadaPlanosService
      .get(this.results)
      .subscribe({
        next: (res) =>this.success(res),
        error: (err) => console.log(err),
      })
      .add(() => {
        this.loading = false;
      });
  }

  consult() {
    this.selected = null;

    const aux = { ...this.results.parametro };

    this.results.parametro = {
      PAR_IDEN: this.user.username,
      C_COLADA_I: this._util.validate(aux.C_COLADA_I),
    };

    this.get();
  }

  nextPageFlag(): boolean {
    return !(
      this.results.parametro?.W_MENSA?.includes('CONTINUA')
    );
  }

  liberarFlag() {
    return !this.selected;
  }

  nextPage() {
    const aux = { ...this.results.parametro };

    this.results = {
      parametro: {
        PAR_IDEN: this.user.username,
        PAG: this._util.validate(aux.PAG),
        W_INI_CONSU: aux.W_PRIM_LIN,
        W_CLAVE_CDA: aux.W_PRIM_LIN,
      },
    };
    this.get();
  }

  libercond() {
    this._dynamicTabs.navigateTo(
      this.hash,
      'AutorizacionAsocColadaOfaPlanosComponent',
      {
        params: { C_COLADA: this.selected?.C_COLADA ?? '' },
        back: true,
      }
    );
  }

  confirmDialog() {
    this.confirm.show('¿Está seguro que desea continuar?', 'liberar');
  }

  displayChangeCxE(value: boolean) {
    this.displayHelpColadasxEdo = value;
  }

  selectedHelpCxE(value: any) {
    this.results.parametro.CC_COLADA = value.CC_COLADA;
  }

  selectedRow(value: any) {
    this.selected = value;
  }
}
