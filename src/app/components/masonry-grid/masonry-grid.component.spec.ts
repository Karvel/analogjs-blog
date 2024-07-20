import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryGridComponent } from './masonry-grid.component';
import { provideHttpClient } from '@angular/common/http';

describe('MasonryGridComponent', () => {
  let component: MasonryGridComponent;
  let fixture: ComponentFixture<MasonryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasonryGridComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
