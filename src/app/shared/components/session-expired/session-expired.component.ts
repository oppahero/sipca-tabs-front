import { Component, Input } from '@angular/core'
import { DialogComponent } from '../dialog/dialog.component'
import { ButtonModule } from 'primeng/button'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-session-expired',
  standalone: true,
  imports: [DialogComponent, ButtonModule, RouterModule],
  templateUrl: './session-expired.component.html',
})
export class SessionExpiredComponent {
  @Input() display: boolean
  header: string = 'Notificación'
  message: string =
    'Sus credenciales de autenticación han expirado. Usted será redireccionado a la página de inicio de sesión.'

  breakpoints = {  '700px': '50vw', '400px': '90vw' }
}
