import { Component, ElementRef, ViewChild } from '@angular/core'
import { LayoutService } from '../../service/app.layout.service'
import { MenuItem } from 'primeng/api'
import { User } from 'src/app/core/models'
import { AuthService, GlobalService } from 'src/app/core/services'

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[]
  user!: User

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(
    public util: GlobalService,
    public layoutService: LayoutService,
    private _authService: AuthService,
  ) {
    this.user =  this._authService.getUser()
  }
}
