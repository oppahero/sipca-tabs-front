import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService, LdapService } from '@core/services'
import { ToastComponent } from '@shared/components'
import { LoginResponse } from '@core/models'
import { Router } from '@angular/router'
import { FullScreenService } from '../fullScreen.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loading = false
  isSubmitted = false
  loginForm!: FormGroup
  dataResponse: LoginResponse

  @ViewChild(ToastComponent) toast: ToastComponent

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _ldapService: LdapService,
    private _authService: AuthService,
    private _fullScreenService: FullScreenService
  ) {}

  ngOnInit() {
    this._authService.clearToken()
    this.createForm()
  }

  createForm() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get formControls() {
    return this.loginForm.controls
  }

  login() {
    const formData = this.loginForm.getRawValue()

    this.loading = true

    this._ldapService.login(formData).subscribe({
      next: (res) => {
        this.isSubmitted = true
        this.dataResponse = res
        this.success()
      },
      error: (e) => {
        this.toast.showMessageByStatus(e)
        this.loading = false
      },
    })
  }

  success() {
    this._fullScreenService.setFullScreen(true)
    this._authService.setSessionStorage(this.dataResponse)
    this._router.navigate(['/'])
  }
}
