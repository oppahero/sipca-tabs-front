import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-divider-with-text',
  standalone: true,
  template: `
    <section class="row">
      <div class="col-md-12">
        <hr [attr.data-content]="text" class="hr-text" />
      </div>
    </section>
  `,
  styles: `
  hr.hr-text {
    position: relative;
    height: 1px;
    background: rgba(0,0,0,.1);
  }

  hr.hr-text::before {
    content: attr(data-content);
    display: inline-block;
    background: #fff;
    font-weight: bold;
    font-size: 0.85rem;
    color: #999;
    border-radius: 30rem;
    padding: 0.2rem 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  `,
})
export class DividerWithTextComponent {
  @Input() text: string = ''
}
