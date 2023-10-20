import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';

import { BlogCardComponent } from '@components/blog-card/blog-card.component';
import { RecentPhotoAlbumsComponent } from '@components/recent-photo-albums/recent-photo-albums.component';
import { siteName } from '@constants/site-name';
import { BlogPost } from '@models/post';
import { MetadataService } from '@services/metadata.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

export const pageTitle = {
  title: `${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogCardComponent, NgFor, RecentPhotoAlbumsComponent],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1>Home</h1>
          <h2>Latest Blog Posts:</h2>
          <ul>
            <li *ngFor="let post of posts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
          <div>
            <h2>Latest Photo Albums:</h2>
            <app-recent-photo-albums />
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class HomeComponent implements OnInit {
  public posts = injectContentFiles<BlogPost>()
    .sort(sortByUpdatedOrOriginalDate)
    .slice(0, 3);

  private metadataService = inject(MetadataService);

  ngOnInit(): void {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
  }
}
