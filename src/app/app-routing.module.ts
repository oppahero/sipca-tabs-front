import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NotfoundComponent } from './demo/components/notfound/notfound.component'
import { authGuard } from './auth.guard'
import { AppLayoutComponent } from './layout/app.layout.component'

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],

  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./demo/components/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
