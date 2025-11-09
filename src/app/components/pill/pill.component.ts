import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@constants/category';

import { getCategoryFromLabel } from '@utils/get-category-from-label';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [NgClass, RouterLink, TitleCasePipe],
  template: `
    <a
      class="my-1 py-1 px-3 !no-underline rounded-full inline-block !font-semibold text-xs"
      [ngClass]="getColors(this.label)"
      [routerLink]="[route, slug]"
    >
      {{ label | titlecase }}
    </a>
  `,
})
export default class PillComponent {
  @Input() public label!: string | undefined;
  @Input() public route!: string | undefined;
  @Input() public slug!: string | undefined;

  public getColors = (label: Category | string | undefined): string => {
    const category = getCategoryFromLabel(label);
    switch (category) {
      case 'development':
        return 'dark:!bg-blue-900 !bg-blue-200 dark:hover:!bg-blue-200 dark:focus:!bg-blue-200 hover:!bg-blue-900 focus:!bg-blue-900 dark:!text-blue-200 !text-blue-900 dark:hover:!text-blue-900 hover:!text-blue-200';
      case 'photography':
        return 'dark:!bg-emerald-900 !bg-emerald-200 dark:hover:!bg-emerald-200 dark:focus:!bg-emerald-200 hover:!bg-emerald-900 dark:!text-emerald-200 !text-emerald-900 dark:hover:!text-emerald-900 dark:focus:!text-emerald-900 hover:!text-emerald-200 focus:!text-emerald-200';
      case 'miscellaneous':
        return 'dark:!bg-rose-900 !bg-rose-200 dark:hover:!bg-rose-200 dark:focus:!bg-rose-200 hover:!bg-rose-900 focus:!bg-rose-900 dark:!text-rose-200 !text-rose-900 dark:hover:!text-rose-900 dark:hover:!text-rose-900 hover:!text-rose-200 focus:!text-rose-200';
      case '':
      default:
        return 'dark:!bg-slate-700 !bg-slate-500 dark:hover:!bg-slate-500 dark:focus:!bg-slate-500 hover:!bg-slate-700 focus:!bg-slate-700 dark:!text-white !text-white dark:hover:!text-white dark:focus:!text-white hover:!text-white focus:!text-white';
    }
  };
}
