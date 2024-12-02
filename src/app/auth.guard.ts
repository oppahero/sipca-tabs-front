import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '@core/services'

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.userIsLoggedIn('userOPENSIPCA')) {
    return true
  }

  router.navigate(['auth/login'])

  return false
}
