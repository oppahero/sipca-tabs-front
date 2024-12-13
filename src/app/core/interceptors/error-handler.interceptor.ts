import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, throwError } from 'rxjs'
import { SessionExpiredService } from '../services/session-expired.service'

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionExpiredService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Emitir que el token expiro
      if (error.status === 401) {
        sessionService.emit(true)
      }

      let responseError =
        error.status === 500 || error.status === 403 || error.status === 401
          ? error.error.error
          : error.error

      if (error.status === 0)
        responseError = {
          message: 'No se ha podido establecer conexión con el servidor.',
        }

      const err = {
        ...responseError,
        status: error.status,
        statusText: error.statusText,
      }

      return throwError(() => err)
    })
  )
}
