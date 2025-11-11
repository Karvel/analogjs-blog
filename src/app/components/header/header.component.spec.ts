import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import HeaderComponent from './header.component';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display site name', () => {
    fixture.detectChanges();
    const siteNameElement = fixture.debugElement.query(
      By.css('.font-semibold'),
    );
    expect(siteNameElement.nativeElement.textContent).toContain(
      'Hapax Legomenon',
    );
  });

  it('should display navigation links', () => {
    fixture.detectChanges();
    const linkElements = fixture.debugElement.queryAll(By.css('li'));
    expect(linkElements.length).toBeGreaterThan(0); // Check if there are navigation links
  });
});
