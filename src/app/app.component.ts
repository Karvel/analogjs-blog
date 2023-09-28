import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import FooterComponent from '@components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
    <app-footer />
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
