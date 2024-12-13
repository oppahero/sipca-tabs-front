import { Type } from '@angular/core'
import { ejecProgCargaCommand } from '@pages/apt/psd/ejecucion-programa-carga/component-map'

export interface CommandOperation {
  componentName: string;
  componentMap: {
    [key: string]: Type<any>;
  };
}

export const commandOperation: { [key: string]: CommandOperation } = {
  ejecProgCargaCommand
}
