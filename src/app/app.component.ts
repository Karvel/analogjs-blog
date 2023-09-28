import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import FooterComponent from '@components/footer/footer.component';
import HeaderComponent from '@components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  template: `
    <div class="flex flex-col h-screen">
      <app-header />
      <main class="grow">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {}
