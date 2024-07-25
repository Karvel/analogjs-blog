import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import TagNamePageComponent from './[tagName].page';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('TagNamePageComponent', () => {
  let component: TagNamePageComponent;
  let fixture: ComponentFixture<TagNamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagNamePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagNamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
