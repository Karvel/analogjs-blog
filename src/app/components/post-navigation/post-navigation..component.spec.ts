import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNavigationComponent } from './post-navigation.component';

describe('PostNavigationComponent', () => {
  let component: PostNavigationComponent;
  let fixture: ComponentFixture<PostNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostNavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
