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
import { RouterLink } from '@angular/router';

export const pageTitle = {
  title: `${siteName}`,
};

export const routeMeta: RouteMeta = pageTitle;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogCardComponent, NgFor, RecentPhotoAlbumsComponent, RouterLink],
  template: `
    <div class="md:max-w md:mx-auto md:flex md:justify-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="sr-only">Home</h1>
          <img
            src="me-sq.jpg"
            class="rounded-full max-h-80 mx-auto"
            alt="Me in Norway"
          />
          <div class="py-4">
            My name is Elanna. I have been a full-stack developer for over seven
            years, primarily focused on Angular and .NET. I have a BA in
            Linguistics from UCSC and made my way into the software industry
            after first taking computer science community college courses and
            then joining a paid internship in 2016. I have been delving into
            Angular since 2017, ever since writing the first line of code for my
            then employer's product front-end overhaul. I now work for
            <a
              href="https://www.crexi.com"
              class=""
              target="_blank"
              rel="noopener"
              >Crexi</a
            >
            as a front end lead software engineer. I enjoy mentoring in code and
            helping dismantle some of the built-in barriers found in the coding
            world. I was also on the non-profit
            <a
              href="(https://59daysofcode.org"
              class=""
              target="_blank"
              rel="noopener"
              >59DaysOfCode</a
            >
            Grand Council for a two year term.
          </div>
          <h2 class="text-xl">Latest Blog Posts:</h2>
          <ul>
            <li *ngFor="let post of posts">
              <app-blog-card [post]="post" />
            </li>
          </ul>
          <app-recent-photo-albums />
        </div>
      </div>
    </div>
  `,
})
export default class HomeComponent implements OnInit {
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  )
    .sort(sortByUpdatedOrOriginalDate)
    .slice(0, 3);

  private metadataService = inject(MetadataService);

  ngOnInit(): void {
    this.metadataService.setPageURLMetaTitle(pageTitle.title);
  }
}
