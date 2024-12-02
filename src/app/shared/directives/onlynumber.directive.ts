import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[OnlyNumber]',
})
export class OnlyNumberDirective {
  regexStr = '^[0-9]*$'
  constructor(private el: ElementRef) {}

  @Input() OnlyNumber!: boolean

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent>event
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1) {
        return
      }
      const ch = e.key
      const regEx = new RegExp(this.regexStr)
      if (regEx.test(ch)) return
      else e.preventDefault()
    }
  }
}
