import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: `
    <p-toast
      position="top-right"
      [style]="{ marginTop: '60px' }"
      key="tc"
    ></p-toast>
  `,
  providers: [MessageService],
})
export class ToastComponent {
  constructor(private messageService: MessageService) {}

  showSuccess(successMsg: string) {
    this.messageService.clear()
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Información',
      detail: successMsg,
    })
  }

  showError(errMsg: string) {
    this.messageService.clear()
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Información',
      detail: errMsg,
    })
  }

  showInfo(infMsg: string) {
    this.messageService.clear()
    this.messageService.add({
      key: 'tc',
      severity: 'info',
      summary: 'Info',
      detail: infMsg,
    })
  }

  showWarn(warnMsg: string) {
    this.messageService.clear()
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Información',
      detail: warnMsg,
    })
  }
}
