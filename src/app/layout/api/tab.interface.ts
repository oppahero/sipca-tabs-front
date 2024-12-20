import { Type } from '@angular/core'

export interface BrowsingHistory {
  componentName: string;
  component: Type<any>;
  data?: any;
}

export interface Tab {
  title: string;
  component: Type<any>;
  id: number;
  history?: BrowsingHistory[];
  componentMap?: { [key: string]: Type<any> };
  data?: any;

  activeTab?: Type<any>;
}
