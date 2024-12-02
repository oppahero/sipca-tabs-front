import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-title',
  standalone: true,
  template: `
    <section class="row">
      <section class="col-md-12">
        <h2 class="custom-card-title">
          <strong> {{ title }}</strong>
        </h2>
      </section>
    </section>
    <hr />
  `,
  styles: `
    .custom-card-title {
      font-size: 12px;
    }
  `
})
export class TitleComponent {
  @Input() title: string = ''
}
