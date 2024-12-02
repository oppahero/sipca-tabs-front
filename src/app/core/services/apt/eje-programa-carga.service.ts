import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EjeProgramaCargaService {
  private _message = new BehaviorSubject<any>([])
  public customMessage = this._message.asObservable()

  private _activeTab(item: any): void {
    this._message.next(item)
  }

  /** Tabs */

  activeAutCarga() {
    this._activeTab(1)
  }

  activeOrdProg() {
    this._activeTab(2)
  }

  activeFrenteDesp() {
    this._activeTab(3)
  }
}
