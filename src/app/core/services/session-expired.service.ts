import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SessionExpiredService {

  private _message = new BehaviorSubject<any>(null)
  public customMessage = this._message.asObservable()

  emit(msg?: any) {
    this._message.next(msg)
  }
}
