import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPhotoAlbumsComponent } from './recent-photo-albums.component';

describe('RecentPhotoAlbumsComponent', () => {
  let component: RecentPhotoAlbumsComponent;
  let fixture: ComponentFixture<RecentPhotoAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPhotoAlbumsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPhotoAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
