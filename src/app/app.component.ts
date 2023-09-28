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
})
export class AppComponent {}
