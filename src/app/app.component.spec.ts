import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MockComponent } from 'ng-mocks';

import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockComponent(HeaderComponent)],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
