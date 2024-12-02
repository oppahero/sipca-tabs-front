import { Component } from '@angular/core'
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-grey-pcard',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card styleClass="grey-pcard">
      <ng-content></ng-content>
    </p-card>
  `,
  styles: `
  :host ::ng-deep .grey-pcard.p-card{
    .p-card-body{
        background: #f4f4f4;
        border: 1px solid #c8c8c8;
        border-radius: 3px;
    }
}
  `,
})
export class GreyPcardComponent {}
