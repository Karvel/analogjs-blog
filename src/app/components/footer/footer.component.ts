import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from '@ngneat/svg-icon';

import { Navigation } from '@models/navigation';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf, SvgIconComponent],
  template: `
    <footer class="bg-[#838db6] dark:bg-sky-950 dark:text-white py-8">
      <div
        class="container mx-auto flex flex-col items-center sm:flex-row sm:justify-center text-sm"
      >
        <div class="flex">
          &copy; Elanna Grossman {{ startYear }}-{{ currentYear }}.&nbsp;
        </div>
        <div class="flex">All Rights Reserved.</div>
      </div>
      <div class="container mx-auto flex flex-wrap justify-center space-x-6">
        <!-- Social Icons -->
        <div *ngFor="let link of linkList" class="pt-2">
          <a
            [href]="link?.path"
            class="dark:text-white hover:text-gray-200 dark:hover:text-gray-400 transition duration-300 ease-in-out"
            target="_blank"
            rel="noopener"
          >
            <ng-container *ngIf="link?.icon">
              <svg-icon [key]="link?.icon" [attr.alt]="link?.label" />
            </ng-container>
            <ng-container *ngIf="!link?.icon">
              {{ link?.label }}
            </ng-container>
            <span class="sr-only">{{ link?.label }}</span>
          </a>
        </div>
        <div class="pt-2">
          <a
            href="mailto:elanna.grossman@gmail.com"
            class="dark:text-white hover:text-gray-200 dark:hover:text-gray-400 transition duration-300 ease-in-out"
            target="_blank"
            rel="noopener"
          >
            <svg-icon key="email" alt="Email" />
            <span class="sr-only">Email me</span>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export default class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
  public linkList: Navigation[] = [
    {
      icon: 'github',
      label: 'GitHub',
      path: 'https://github.com/Karvel',
    },
    {
      icon: 'linked-in',
      label: 'LinkedIn',
      path: 'https://www.linkedin.com/in/elannagrossman/',
    },
    {
      icon: 'flickr',
      label: 'Flickr',
      path: 'https://www.flickr.com/photos/jadeilyn/',
    },
    {
      icon: 'devto',
      label: 'Dev.to',
      path: 'https://dev.to/karvel',
    },
    {
      icon: 'rss',
      label: 'RSS',
      path: 'api/feed.xml',
    },
  ];
  public readonly startYear = 2015;
}
