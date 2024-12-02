import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  private _message = new BehaviorSubject<any>([])

  public customMessage = this._message.asObservable()

  constructor() {}

  active(item: any): void {
    this._message.next(item)
  }

}
