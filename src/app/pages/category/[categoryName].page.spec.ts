import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import CategoryNamePageComponent from './[categoryName].page';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('CategoryNamePageComponent', () => {
  let component: CategoryNamePageComponent;
  let fixture: ComponentFixture<CategoryNamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNamePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
