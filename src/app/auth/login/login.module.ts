import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PasswordModule } from 'primeng/password'
import { InputTextModule } from 'primeng/inputtext'
import { MessagesModule } from 'primeng/messages'
import { ProgressBarModule } from 'primeng/progressbar'
import { MessageService } from 'primeng/api'
import { ToastComponent } from '@shared/components'

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    ProgressBarModule,

    ToastComponent
  ],
  declarations: [LoginComponent],
  providers: [MessageService]
})
export class LoginModule { }
