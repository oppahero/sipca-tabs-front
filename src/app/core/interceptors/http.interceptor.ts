import { HttpInterceptorFn } from '@angular/common/http'
// import { AuthService } from '../services'
// import { inject } from '@angular/core'

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  // const auth = inject(AuthService)

  // const token = auth.getToken()

  // if (token) {
  //   const cloned = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${token}`),
  //   })
  //   return next(cloned)
  // }

  return next(req)
}
