import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { siteName } from '@constants/site-name';
import { Navigation } from '@models/navigation';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgClass, NgIf, NgFor, RouterLink],
  styleUrls: ['./header.component.css'],
  template: `
    <nav class="bg-[#829ab3] border-gray-300 dark:bg-sky-800">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <div class="flex">
          <a routerLink="/" class="flex items-center no-underline">
            <img
              src="images/self/logo.png"
              width="50"
              alt="Hapax Legomenon logo"
              loading="lazy"
            />
            <span
              class="self-center text-lg sm:text-2xl font-semibold whitespace-nowrap dark:text-white max-[350px]:hidden"
              >{{ siteName }}</span
            >
          </a>
        </div>
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
            class="font-medium flex flex-col md:p-0 mt-4 items-end rounded-lg md:flex-row md:items-center md:space-x-8 md:mt-0 md:bg-[#829ab3] dark:bg-sky-800 md:dark:bg-sky-800 dark:border-sky-800"
          >
            <li *ngFor="let link of linkList">
              <a
                [routerLink]="link?.path"
                class="block py-2 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:hover:underline md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-sky-900 dark:hover:text-white md:dark:hover:bg-transparent no-underline"
                >{{ link?.label }}</a
              >
            </li>
            <li>
              <label
                class="switch"
                for="theme-toggle"
                [attr.aria-label]="'Toggle theme'"
                tabindex="0"
                (keypress)="toggleTheme()"
              >
                <span class="sun"
                  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle r="5" cy="12" cx="12" />
                    <path
                      d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"
                    /></svg
                ></span>
                <span class="moon"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                    /></svg
                ></span>
                <input
                  class="input"
                  id="theme-toggle"
                  tabindex="-1"
                  type="checkbox"
                  (change)="toggleTheme()"
                  [(ngModel)]="isChecked"
                />
                <span class="slider"></span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export default class HeaderComponent {
  public isChecked!: boolean;
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
      label: 'Talks',
      path: 'talks',
    },
    {
      label: 'Photos',
      path: 'photos',
    },
  ];
  public siteName = siteName;
  public showMenu = false;

  private themeService = inject(ThemeService);
  public theme$ = this.themeService.theme$;

  constructor() {
    this.theme$.subscribe((theme) => {
      this.isChecked = theme === 'light';
    });
  }

  public toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
