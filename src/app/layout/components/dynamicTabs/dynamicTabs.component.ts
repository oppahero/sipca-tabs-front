import { Component, OnDestroy, Type } from '@angular/core'
import { AutCargaDetComponent } from '@pages/apt/psd/ejecucion-programa-carga/aut-carga-det/aut-carga-det.component'
import { OpenInTabService } from '../../service/open-in-tab.service'
import { Subscription } from 'rxjs'
import { AutCargaComponent } from '@pages/apt/psd/ejecucion-programa-carga/aut-carga/aut-carga.component'
import { TabSelected } from '@core/models/tab-selected.interface'

interface History {
  componentName: string;
  component: Type<any>;
  data?: any;
}

interface Tab {
  title: string;
  component: Type<any>;
  id: number;
  history?: History[];
  componentMap?: { [key: string]: Type<any> };
  data?: any;

  activeTab?: Type<any>;
}

@Component({
  selector: 'app-dynamic-tabs',
  templateUrl: './dynamicTabs.component.html',
})
export class DynamicTabsComponent implements OnDestroy {
  tabsSuscription: Subscription
  tabs: Tab[] = []

  private componentMap: { [key: string]: Type<any> } = {
    AutCargaComponent,
    AutCargaDetComponent,
  }

  constructor(private dynamicTabs: OpenInTabService) {
    this.tabsSuscription = this.dynamicTabs.tab.subscribe(
      (selectedData: TabSelected) => {
        if (!selectedData) return
        const { componentName, componentMap } = selectedData
        const component = this.getComponentByName(componentMap, componentName)
        if (component) this.addTab(selectedData, component)
      }
    )
  }

  get id(): number {
    return new Date().getTime()
  }

  ngOnDestroy(): void {
    this.tabsSuscription.unsubscribe()
  }

  closeTab(tab: Tab) {
    this.tabs = this.tabs.filter((t) => t !== tab)
  }

  addTab(selectedData: TabSelected, component: Type<any>) {
    const { label: title, componentName, componentMap } = selectedData

    const existingTab = this.tabs.find((t) => t.title === title)

    if (!existingTab) {
      const id = this.id
      const newTab: Tab = { title, component, id, componentMap }

      newTab.history = [{ component: newTab.component, componentName }]

      this.tabs.push(newTab)
    }
  }

  getComponentByName(componentMap, name: string): Type<any> | null {
    return componentMap[name] || null
  }

  navigateTo(hash: number, toComponent: string, data?: any) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === hash)
    const tabByIndex = this.tabs[tabIndex]

    const newComponent = this.getComponentByName(
      tabByIndex.componentMap,
      toComponent
    )

    if (newComponent !== tabByIndex.component) {
      this.tabs[tabIndex].history.push({
        component: newComponent,
        data,
        componentName: toComponent,
      })
      this.tabs[tabIndex].component = newComponent
      this.tabs[tabIndex].data = data
    }
  }

  back(hash: number) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === hash)

    this.tabs[tabIndex].history.pop()

    const historyLength = this.tabs[tabIndex].history.length

    if (historyLength) {
      const last = this.tabs[tabIndex].history[historyLength - 1]
      this.tabs[tabIndex] = {
        ...this.tabs[tabIndex],
        component: last.component,
        data: last.data
      }
    }
  }

  getInputs(tab: Tab) {
    return { hash: tab.id, data: tab.data }
  }

  setDataOnComponentActive(hash: number, data: any) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === hash)

    const activeComponent = this.tabs[tabIndex].component

    const historyIndex = this.tabs[tabIndex].history.findIndex((i) => i.component === activeComponent )

    this.tabs[tabIndex].history[historyIndex].data = data
  }
}
