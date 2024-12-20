import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SessionExpiredService {

  private _message = new Subject<any>()
  public customMessage = this._message.asObservable()

  emit(msg?: any) {
    this._message.next(msg)
  }
}
