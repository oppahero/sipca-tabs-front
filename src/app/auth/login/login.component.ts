import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Message } from 'primeng/api'
import { LayoutService } from 'src/app/layout/service/app.layout.service'
import { User } from 'src/app/core/models'
import { FullScreenService } from '../fullScreen.service'
import { AuthService, LdapService, UserService } from 'src/app/core/services'

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

      // .progress{
      //   position: fixed;
      //   top:0;
      //   left: 0;
      //   z-index: 1000;
      // }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loading = false
  error = ''
  user: User

  loginForm: FormGroup
  isSubmitted = false
  messages: Message[] | undefined

  constructor(
    public layoutService: LayoutService,
    private _router: Router,
    private _ldapService: LdapService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
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
      next: (response) => {
        if (response.result) {
          this.user = {
            username: formData.username,
            name: response.result,
          }

          this.getDni(formData)
        } else {
          this.addMessage(response.message)
          this.loading = false
        }
      },
      error: (e) => {
        console.error(e)
        this.loading = false
      },
    })
  }

  getDni(formData) {
    this._userService.getCiBySir({ siglado: formData.username }).subscribe({
      next: (response) => {
        const aux: any = response.pop()
        if (aux) this.user.dni = aux.cedula
      },
      error: (e) => console.log(e),
      complete: () => {
        this.success()
        this.loading = false
      },
    })
  }

  success() {
    this._fullScreenService.setFullScreen(true)
    this._authService.setSessionStorage('userOPENSIPCA', this.user)
    this._router.navigate([''])
  }

  addMessage(message: string) {
    this.messages = [{ severity: 'warn', summary: message }]
  }
}
