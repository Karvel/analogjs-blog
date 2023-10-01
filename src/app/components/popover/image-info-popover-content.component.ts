import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-info-popover-content',
  standalone: true,
  imports: [NgIf],
  template: `
    <div
      class="container bg-white dark:bg-[#242424] rounded-md p-4 text-slate-900 dark:text-neutral-100"
    >
      <a [href]="cover_image_source" class="" target="_blank" rel="noopener">{{
        cover_image_title
      }}</a>
      <span *ngIf="cover_image_author"> by {{ cover_image_author }}</span>
    </div>
  `,
})
export default class ImageInfoPopoverContentComponent {
  @Input() public cover_image_author!: string | undefined;
  @Input() public cover_image_source!: string | undefined;
  @Input() public cover_image_title!: string | undefined;
}
