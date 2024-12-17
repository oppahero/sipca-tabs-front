import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  private _message = new Subject<any>()

  operation$ = this._message.asObservable()

  add(items: any): void {
    this._message.next(items)
  }
}
