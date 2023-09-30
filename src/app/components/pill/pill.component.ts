import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  template: `
    <button
      class="my-1 py-1 px-3 no-underline rounded-full bg-neutral-500 dark:bg-neutral-700 text-white font-semibold text-xs hover:text-white hover:bg-neutral-700 dark:hover:bg-neutral-500"
      [routerLink]="[route, slug]"
    >
      {{ label | titlecase }}
    </button>
  `,
})
export default class PillComponent {
  @Input() public label!: string | undefined;
  @Input() public route!: string | undefined;
  @Input() public slug!: string | undefined;
}
