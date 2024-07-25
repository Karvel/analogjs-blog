import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import MonthPageComponent from './[year].[month].page';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('MonthPageComponent', () => {
  let component: MonthPageComponent;
  let fixture: ComponentFixture<MonthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
