import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SearchPopoverComponent } from './search-popover.component';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('SearchPopoverComponent', () => {
  let component: SearchPopoverComponent;
  let fixture: ComponentFixture<SearchPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPopoverComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
