import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageService {
  private _message = new BehaviorSubject<any>([])

  customMessage = this._message.asObservable()

  add(items: any): void {
    this._message.next(items)
  }
}
