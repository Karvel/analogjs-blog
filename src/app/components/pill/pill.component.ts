import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
      [ngClass]="[
        'dark:bg-' + color.dark,
        'bg-' + color.light,
        'dark:hover:bg-' + color.light,
        'hover:bg-' + color.dark,
        color.text ? 'dark:text-' + color.text : 'dark:text-' + color.light,
        color.text ? 'text-' + color.text : 'text-' + color.dark,
        color.text
          ? 'dark:hover:text-' + color.text
          : 'dark:hover:text-' + color.dark,
        color.text ? 'hover:text-' + color.text : 'hover:text-' + color.light
      ]"
      [routerLink]="[route, slug]"
    >
      {{ label | titlecase }}
    </a>
  `,
})
export class PillComponent implements OnInit {
  @Input() public label!: string | undefined;
  @Input() public route!: string | undefined;
  @Input() public slug!: string | undefined;

  public color!: Theme;

  public ngOnInit(): void {
    this.color = getColors(this.label);
  }
}
