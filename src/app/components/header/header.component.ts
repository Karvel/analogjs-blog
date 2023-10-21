import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { siteName } from '@constants/site-name';
import { Navigation } from '@models/navigation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink],
  template: `
    <nav class="bg-[#829ab3] border-gray-300 dark:bg-sky-800">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a routerLink="/" class="flex items-center no-underline">
          <span
            class="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white"
            >{{ siteName }}</span
          >
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-gray-400 dark:hover:bg-sky-900 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          (click)="toggleNavbar()"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          [ngClass]="{ hidden: !showMenu, flex: showMenu }"
          class="hidden w-full justify-end md:block md:w-auto"
          id="navbar-default"
        >
          <ul
            class="font-medium flex flex-col md:p-0 mt-4 items-end rounded-lg md:flex-row md:space-x-8 md:mt-0 md:bg-[#829ab3] dark:bg-sky-800 md:dark:bg-sky-800 dark:border-sky-800"
          >
            <li *ngFor="let link of linkList">
              <a
                [routerLink]="link?.path"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:hover:underline md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-sky-900 dark:hover:text-white md:dark:hover:bg-transparent no-underline"
                >{{ link?.label }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export default class HeaderComponent {
  public linkList: Navigation[] = [
    {
      label: 'About',
      path: 'about',
    },
    {
      label: 'Blog',
      path: 'blog',
    },
    {
      label: 'Photos',
      path: 'photos',
    },
  ];
  public siteName = siteName;
  public showMenu = false;

  public toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }
}
