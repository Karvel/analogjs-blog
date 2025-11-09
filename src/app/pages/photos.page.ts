import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-photos-page',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class PhotosPageComponent {}
