import { Injectable } from '@angular/core'
import { TabSelected } from '@core/models/tab-selected.interface'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class OpenInTabService {

  private message = new BehaviorSubject<TabSelected>(null)

  public tab = this.message.asObservable()

  public newTab(item: TabSelected): void {
    this.message.next(item)
  }
}
