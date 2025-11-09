
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import { ArchiveLink } from '@models/archive-link';
import { BlogPost } from '@models/post';
import { getArchiveLinks } from '@utils/get-archive-links';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (posts?.length) {
      <h2 class="text-xl pb-5">Archives:</h2>
      @for (link of archiveLinks; track link.label) {
        <div>
          <a [routerLink]="['/blog', link.year, link.month]">{{ link.label }}</a>
        </div>
      }
    }
    `,
})
export default class ArchiveComponent implements OnInit {
  @Input() public posts: ContentFile<BlogPost>[] = [];

  archiveLinks!: ArchiveLink[];

  public ngOnInit(): void {
    this.archiveLinks = getArchiveLinks(this.posts);
  }
}
