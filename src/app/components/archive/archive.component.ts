import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { getMonthName } from '@utils/get-month-name';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, RouterLink],
  template: `
    <ng-container *ngIf="posts?.length">
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
    this.archiveLinks = this.getArchiveLinks(this.posts);
  }

  private getArchiveLinks(posts: ContentFile<BlogPost>[]): ArchiveLink[] {
    const archiveMap = new Map<string, ArchiveLink>();

    for (const post of posts) {
      if (post.attributes.date) {
        const date = new Date(post.attributes.date);
        const year = date.getUTCFullYear().toString();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const label = `${getMonthName(parseInt(month))} ${year}`;

        if (archiveMap.has(label)) {
          const existingLink = archiveMap.get(label);
          if (existingLink && year > existingLink.year) {
            existingLink.year = year;
          }
        } else {
          archiveMap.set(label, { label, month, year });
        }
      }
    }

    return Array.from(archiveMap.values());
  }
}

export interface ArchiveLink {
  label: string;
  month: string;
  year: string;
}
