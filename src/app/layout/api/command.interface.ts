import { Type } from '@angular/core'

export interface OperationCommand {
  componentName: string;
  componentMap: {
    [key: string]: Type<any>;
  };
}
