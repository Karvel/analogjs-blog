import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <nav class="bg-[#829ab3] border-gray-300 dark:bg-sky-800">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a routerLink="/" class="flex items-center no-underline">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Hapax Legomenon</span
          >
        </a>
      </div>
    </nav>
  `,
})
export default class HeaderComponent {}
