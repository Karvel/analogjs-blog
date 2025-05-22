import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Theme } from '@models/theme';
import { getColors } from '@utils/get-colors';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [NgClass, RouterLink, TitleCasePipe],
  template: `
    <a
      class="my-1 py-1 px-3 no-underline rounded-full inline-block font-semibold text-xs"
      [ngClass]="getColors2()"
      [routerLink]="[route, slug]"
    >
      {{ label | titlecase }}
    </a>
  `,
})
export class PillComponent {
  @Input() public label!: string | undefined;
  @Input() public route!: string | undefined;
  @Input() public slug!: string | undefined;

  public color!: Theme;


  public getColors2() {
    return getColors(this.label);
  }

}
