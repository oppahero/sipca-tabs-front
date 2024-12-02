import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { MenuChangeEvent } from '../../api/menuchangeevent'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menuSource = new Subject<MenuChangeEvent>()
  private _resetSource = new Subject()

  menuSource$ = this._menuSource.asObservable()
  resetSource$ = this._resetSource.asObservable()

  onMenuStateChange(event: MenuChangeEvent) {
    this._menuSource.next(event)
  }

  reset() {
    this._resetSource.next(true)
  }
}
