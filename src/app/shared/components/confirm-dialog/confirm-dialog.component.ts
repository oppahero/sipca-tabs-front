import { Component, EventEmitter, Output } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { ConfirmDialogModule as ConfirmDialog } from 'primeng/confirmdialog'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ConfirmDialog],
  template: `
    <p-confirmDialog [closable]="false" [style]="{ width: '450px' }">
    </p-confirmDialog>
  `,
  providers: [ConfirmationService],
})
export class ConfirmDialogComponent {
  @Output() acceptEvent = new EventEmitter<string>()

  constructor(private confirmationService: ConfirmationService) {}

  show(mssg: string, key: string) {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: mssg,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.acceptEvent.emit(key)
      },
    })
  }
}
