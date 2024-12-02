import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[FillWithCero]',
})
export class FillWithCeroDirective  {
  constructor(private el: ElementRef) {}

  @Input() FillWithCero!: number

  @HostListener('input', ['$event.target']) onKeyUp(event) {
    const e = event
    const aux = Number(e.value)

    if (aux) {
      const number = aux.toString().padStart(this.FillWithCero, '0')
      e.value = number.toString()
    }
  }

}
