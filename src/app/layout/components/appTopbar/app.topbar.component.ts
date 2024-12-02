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
    public layoutService: LayoutService,
    public util: GlobalService,
    private authService: AuthService
  ) {
    this.user =  this.authService.user()
  }
}
