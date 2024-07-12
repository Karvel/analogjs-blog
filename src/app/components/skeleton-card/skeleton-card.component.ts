import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="rounded-md animate-pulse bg-no-repeat bg-neutral-300 dark:bg-neutral-700"
      aria="Loading placeholder"
      [ngStyle]="{ height, maxWidth, width }"
    ></div>
  `,
})
export class SkeletonCardComponent {
  @Input() public height: string = '';
  @Input() public maxWidth: string = '';
  @Input() public width: string = '';
}
