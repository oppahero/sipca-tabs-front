# Dynamic Tabs - Angular 17

This Angular project features a custom architecture for dynamically instantiating components inside accordion panels that behave like tabs. Each accordion represents an independent operation and manages its own internal navigation. The entire flow is built without relying on Angular's native routing system, enabling a modular and parallel experience within a single view.

NOTE:
This project showcases a technical extract from a logic developed for an enterprise system, specifically designed to meet the requirement of dynamic tabs with independent navigation.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select operations based on the active module from the side menu.

- Open an operation and navigate through its internal views without triggering route changes.

- Work with multiple operations open simultaneously, each preserving its own state and data.

- Close operations (tabs) that are no longer needed, freeing up visual space and resources.

### Links

The demo has no database connection. To bypass the login, use any username and password.

- Live Site URL: [Demo](https://oppahero.github.io/sipca-tabs-front/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Angular
- Primeng
- Primeflex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5

### What I learned

Observables were implemented to handle key events within the application. One of them detects when the user clicks on an operation, triggering the dynamic instantiation of the corresponding component and adding it as a new active tab.

To handle dynamic accordions, the PrimeNG accordion component was customized by using the \*ngComponentOutlet directive within each tab's content. This directive enables dynamic component loading, allowing the rendering of classes whose types are not known at compile time but are resolved at runtime.

Additionally, the input property was implemented to pass data directly to the dynamically instantiated component, enabling it to receive runtime values and maintain contextual behavior.

```html
<ng-container *ngComponentOutlet="tab.component; inputs: getInputs(tab)"></ng-container>
```

# Tab Structure

To manage the creation of new operations as tabs, a custom structure was defined to encapsulate all the necessary information:

- id: Unique identifier for the tab, essential for navigation.

- title: Display name of the operation.

- component: The currently active component rendered inside the accordion body.

- componentMap: Set of components that define the internal navigation flow of the operation.

- data: Input data specific to the active component.

- history: Navigation stack that stores previously visited components within the operation, enabling backward navigation between views.

```ts
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
}
```

# Other DynamicTab methods

In addition to managing the creation of new tabs, the dynamicTab structure includes key methods for controlling navigation and internal state within each operation:

1. navigateTo: Navigates to a specific component within the tab, as long as it exists in the tab's componentMap.

```ts
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
```

2. back: Returns to the previously visited component within the same tab, using the navigation stack (history).

```ts
  back(hash: number) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === hash)

    this.tabs[tabIndex].history.pop()

    const historyLength = this.tabs[tabIndex].history.length

    if (historyLength) {
      const last = this.tabs[tabIndex].history[historyLength - 1]
      this.tabs[tabIndex].component = last.component
      this.tabs[tabIndex].data = last.data
    }
  }
```

3. setDataOnComponentActive: Assigns data to the currently active component in the specified tab.

```ts
  setDataOnComponentActive(hash: number, data: any) {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === hash)

    const activeComponent = this.tabs[tabIndex].component

    const historyIndex = this.tabs[tabIndex].history.findIndex(
      (i) => i.component === activeComponent
    )

    this.tabs[tabIndex].history[historyIndex].data = data
  }
```

This last method is particularly important, as it allows storing information in the current view before transitioning to another view within the same tab, ensuring consistent state management.

# How to define a navigation map for an operation

Instead of relying on Angular’s traditional routing system, each operation defines its own list of components that make up its internal navigation flow. This approach enables custom navigation management within each operation, without using the RouterModule.

```ts
const ejecProgCargaMap: { [key: string]: Type<any> } = {
  AutCargaComponent,
  AutCargaDetComponent,
};
```

# Dynamic menus and their actions

The system menus are fully dynamic. The main menu is returned by the backend after user authentication and is built based on the user's assigned permissions. The expected structure for these menus follows the MenuItem format from PrimeNG.

Once received, the menu is mapped to dynamically attach a command action to each item. This action is responsible for fetching the operations associated with the selected module and is only executed when the user clicks on the corresponding menu item.

```ts
addCommandsToMenuItems(menu: MenuItem[]) {
    this.model = menu.map((root) => {
      root.items = root.items.map((group) => {
        group.items = group.items.map((item) => {
          return {
            ...item,
            command: () => {
              this.fetchOperationsMenu(item.id)
            },
          }
        })
        return group
      })
      return root
    })
  }
```

When the operations observable receives the menu to be displayed, it is remapped to include the logic for opening an operation as a new tab. Each menu item is linked to an action that, when triggered by the user, dynamically instantiates the corresponding component and adds it to the set of active tabs.

```ts
addCommandsToOperationsMenu(operations: MenuItem[]) {
    this.items = operations.map((group) => {
      group.items = group.items.map((item) => {
        return {
          ...item,
          command: () => {
            this.operationClick(item, item.command.toString())
          },
        }
      })
      return group
    })
  }

  operationClick(item: MenuItem, commandName: string) {
    this._dynamicTab.newTab({
      label: item.label,
      ...operationCommand[commandName],
    })
  }
```

To ensure the system can accurately identify which component to instantiate dynamically, each operation must define its own command structure. This structure serves as an explicit reference that links the operation to its corresponding component, allowing the system to locate and render it at runtime.

```ts
export const ejecProgCargaCommand = {
  componentName: "AutCargaComponent",
  componentMap: ejecProgCargaMap,
};
```

## Author

- Maria López - [Github](https://github.com/oppahero)
