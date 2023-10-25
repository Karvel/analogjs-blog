import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import { ArchiveLink } from '@models/archive-link';
import { BlogPost } from '@models/post';
import { getArchiveLinks } from '@utils/get-archive-links';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, RouterLink],
  template: `
    <ng-container *ngIf="posts?.length">
      <h2 class="text-xl pb-5">Archives:</h2>
      <div *ngFor="let link of archiveLinks">
        <a [routerLink]="['/blog', link.year, link.month]">{{ link.label }}</a>
      </div>
    </ng-container>
  `,
})
export class ArchiveComponent implements OnInit {
  @Input() public posts!: ContentFile<BlogPost>[];

  archiveLinks!: ArchiveLink[];
  public month!: string;
  public monthName!: string;
  public year!: string;

  public ngOnInit(): void {
    this.archiveLinks = getArchiveLinks(this.posts);
  }
}
