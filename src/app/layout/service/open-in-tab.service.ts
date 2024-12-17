import { Injectable } from '@angular/core'
import { TabSelected } from '@core/models/tab-selected.interface'
import { Subject } from 'rxjs'

@Injectable()
export class OpenInTabService {

  private _message = new Subject<TabSelected>()

  tab$ = this._message.asObservable()

  newTab(item: TabSelected): void {
    this._message.next(item)
  }
}
