import { ejecProgCargaCommand } from '@pages/apt/apt-command'
import { OperationCommand } from '../api/command.interface'

import {
  lconsLibColadasPlnCommand,
  autAsocColadaOfaPlnCommand,
} from '@pages/cal/cal-command'

export const operationCommand: { [key: string]: OperationCommand } = {
  ejecProgCargaCommand,

  lconsLibColadasPlnCommand,
  autAsocColadaOfaPlnCommand,
}
