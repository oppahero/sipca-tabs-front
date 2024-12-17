import { ejecProgCargaCommand } from '@pages/apt/apt-command'
import { OperationCommand } from '../api/command.interface'

export const operationCommand: { [key: string]: OperationCommand } = {
  ejecProgCargaCommand,
}
