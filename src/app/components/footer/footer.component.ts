import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf],
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
    </footer>
  `,
})
export default class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
  public readonly startYear = 2015;
}
