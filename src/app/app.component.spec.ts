import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import AppComponent from './app.component';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
