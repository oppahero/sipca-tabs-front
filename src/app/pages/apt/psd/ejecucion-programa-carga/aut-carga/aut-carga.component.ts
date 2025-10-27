import { DynamicTabsComponent } from 'src/app/layout/components/dynamicTabs/dynamicTabs.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '@shared/components';
import { AuthService, GlobalService } from '@core/services';
import { Column, MDWResponse, User } from '@core/models';
import { DatePipe } from '@angular/common';
import {
  AutCargaLargosService,
  AutCargaLargosCanService,
  AutCargaLargosConfirService,
} from '@core/services/apt';


const mockData = [
  {
    NN_SECUEN_VIAJE: 1001,
    NN_SECUEN_PROG: 2001,
    CC_ORDEN_DESP: 'ORD-001',
    CC_POS_ODESP: 'POS-01',
    DD_CLI_DESTINO: 'Cliente A',
    CC_COND_ENTREG: 'Condición A',
    DD_PUERTO: 'Puerto A',
    DD_PRODUCTO: 'Producto A',
    QQ_CARGA_PROG: 1500,
    QQ_CARGA_DESP: 1450,
    FF_CARGA: '2025-10-27',
    HH_CARGA: '08:30',
    CC_PROG_DESP: 'PRG-001',
    DD_EDO_PROG: 'Autorizado',
    DD_TIPO_VIAJE: 'Exportación',
    DD_CIA_TRANSPORTE: 'Transporte A',
    DD_NOMBRE_COND: 'Juan Pérez',
    CC_TRSP_MOVIL: 'ABC-123',
    CC_TRSP_CARGA: 'XYZ-789',
    MM_IND_ELAB: 'Planta A'
  },
]

@Component({
  selector: 'app-aut-carga',
  templateUrl: './aut-carga.component.html',
  providers: [DatePipe],
})
export class AutCargaComponent implements OnInit {
  user: User;
  title: string;
  cols: Column[];
  rows: any[] = mockData;  //Para demo
  selected: any;
  results: MDWResponse = { parametro: {}, tabla1: [] };
  date: Date;

  loading = false;
  displayHelp = false;

  @ViewChild(ConfirmDialogComponent) confirm: ConfirmDialogComponent;

  @Input() hash: number;

  @Input() set data(value: any) {
    if (value) {
      const { params, date } = value;
      this.results.parametro = params;
      this.date = date;
    }
  }

  constructor(
    private _datePipe: DatePipe,
    private _util: GlobalService,
    private _authService: AuthService,
    private _dynamicTabs: DynamicTabsComponent,
    private _autCargaService: AutCargaLargosService,
  ) {
    this.user = this._authService.getUser();
    this.title = 'Ejecución de Programa de Carga - Autorización Carga';
  }

  ngOnInit() {
    this.setCols();
    this.consult();
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
    ];
  }

  filter(res: MDWResponse): object[] {
    return res.tabla1.filter((x) => x.NN_SECUEN_VIAJE !== '');
  }

  success(res: MDWResponse) {
    this.rows = this.filter(res);
    this.results.parametro = res.parametro;
  }

  get() {
    this.loading = true;

    this._autCargaService
      .get(this.results)
      .subscribe({
        next: (res) => this.success(res),
        error: (err) => console.log(err),
      })
      .add(() => (this.loading = false));
  }

  consult() {
    this.selected = null;
    const aux = { ...this.results.parametro };
    const date = this._datePipe.transform(this.date, 'yyyyMMdd');

    this.results.parametro = {
      PAR_IDEN: this.user?.username,
      C_GRP_ALM: this._util.validate(aux.C_GRP_ALM),
      N_PROG_DESP: this._util.validate(aux.N_PROG_DESP),
      F_CARGA: this._util.validate(date),
      N_SECUEN_PROG_MDW: this._util.validate(aux.N_SECUEN_PROG_MDW),
      C_EDO_PROG_MDW: this._util.validate(aux.C_EDO_PROG_MDW),
    };

    this.get();
  }

  nextPageFlag(): boolean {
    return !(this.results.parametro.W_C_MENSA === '010');
  }

  // *EJEMPLO DE NAVEGACIÓN EN LA MISMA OPERACION
  detail() {
    // Ejemplo de como guardar datos en el componente activo
    this._dynamicTabs.setDataOnComponentActive(this.hash, {
      params: this.results.parametro,
      date: this.date,
    });

    // Ejemplo de como navegar a otro componente dentro del tab actual
    this._dynamicTabs.navigateTo(
      this.hash,
      'AutCargaDetComponent',
      this.selected.NN_SECUEN_PROG
    );
  }

  displayChange(value: boolean) {
    this.displayHelp = value;
  }

  selectedHelp(value: any) {
    this.results.parametro = {
      ...this.results.parametro,
      C_EDO_PROG_MDW: this._util.fillWithCeros(value.NN_EDO_PROG, 2),
      D_EDO_PROG: value.DD_EDO_PROG,
    };
  }

  selectedRow(value: any) {
    this.selected = value;
  }
}
