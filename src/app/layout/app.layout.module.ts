import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InputTextModule } from 'primeng/inputtext'
import { SidebarModule } from 'primeng/sidebar'
import { BadgeModule } from 'primeng/badge'
import { RadioButtonModule } from 'primeng/radiobutton'
import { InputSwitchModule } from 'primeng/inputswitch'
import { RippleModule } from 'primeng/ripple'
import { RouterModule } from '@angular/router'
import { AppMenuComponent } from './components/appMenu/app.menu.component'
import { AppMenuitemComponent } from './components/appMenu/app.menuitem.component'
import { AppFooterComponent } from './components/appFooter/app.footer.component'
import { AppTopBarComponent } from './components/appTopbar/app.topbar.component'
import { AppSidebarComponent } from './components/appSidebar/app.sidebar.component'
import { AppConfigModule } from './config/config.module'
import { AppLayoutComponent } from './app.layout.component'
import { PanelMenuModule } from 'primeng/panelmenu'
import { AvatarModule } from 'primeng/avatar'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
import { DynamicTabsComponent } from './components/dynamicTabs/dynamicTabs.component'
import { OpenInTabService } from './service/open-in-tab.service'
import { OperationsComponent } from './components/operations/operations.component'

import { SessionExpiredComponent, ToastComponent } from '../shared/components'
import { AptModule } from '@pages/apt/apt.module'
import { CalModule } from '@pages/cal/cal.module'

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent,
    OperationsComponent,
    DynamicTabsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    PanelMenuModule,
    AvatarModule,

    // !AÑADIDO
    ToastComponent,
    SessionExpiredComponent,
    AccordionModule,
    ButtonModule,

    AptModule,
    CalModule,
  ],
  exports: [AppLayoutComponent],
  providers: [OpenInTabService],
})
export class AppLayoutModule {}
