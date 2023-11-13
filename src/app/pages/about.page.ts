import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class AboutPageComponent {}
