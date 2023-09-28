import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import FooterComponent from '@components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, RouterOutlet],
  template: `
    <div class="flex flex-col h-screen">
      <main class="grow">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {}
