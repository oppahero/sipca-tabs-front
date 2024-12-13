import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { ToastModule, ToastPositionType } from 'primeng/toast'

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: ' <p-toast [position]="position" key="tc"></p-toast> ',
  providers: [MessageService],
})
export class ToastComponent {
  position: ToastPositionType = 'top-right'

  constructor(private _messageService: MessageService) {}

  showSuccess(successMsg: string) {
    this._messageService.clear()
    this._messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Información',
      detail: successMsg,
    })
  }

  showError(errMsg: string) {
    // this.messageService.clear()
    this._messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Error',
      detail: errMsg,
    })
  }

  showInfo(infMsg: string) {
    this._messageService.clear()
    this._messageService.add({
      key: 'tc',
      severity: 'info',
      summary: 'Información',
      detail: infMsg,
    })
  }

  showWarn(warnMsg: string) {
    this._messageService.clear()
    this._messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Alerta',
      detail: warnMsg,
    })
  }

  /**
   *
   * @param err Estructura enviada por el Error Handler Interception
   */
  showMessageByStatus(err) {
    if (err.status === 409) this.showInfo(err.message)
    else this.showError(err.message)
  }
}
