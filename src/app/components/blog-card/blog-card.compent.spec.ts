import { DatePipe } from '@angular/common';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { ContentFile } from '@analogjs/content';
import { of } from 'rxjs';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { BlogCardComponent } from './blog-card.component';
import { smallBreakpointSize } from '@constants/breakpoint-size';
import { BlogPost } from '@models/post';
import { ScreenSizeService } from '@services/screen-size.service';
import { getYear } from '@utils/get-year';
import { getMonth } from '@utils/get-month';
import { provideLocationMocks } from '@angular/common/testing';
import { getTitleCase } from '@utils/get-title-case';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;
  let screenSizeService: ScreenSizeService;

  const mockPost: ContentFile<BlogPost> = {
    attributes: {
      title: 'Test Title',
      date: '2023-01-01',
      last_updated: '2023-01-10',
      description: 'Test Description',
      category: 'development',
      cover_image: 'test-image.jpg',
      cover_image_title: 'Test Image Title',
    },
    filename: 'test-file.md',
    slug: 'test-slug',
  };

  beforeEach(async () => {
    const screenSizeServiceMock = {
      screenWidth: of(800),
    };

    await TestBed.configureTestingModule({
      imports: [BlogCardComponent],
      providers: [
        DatePipe,
        provideRouter([]),
        provideLocationMocks(),
        { provide: ScreenSizeService, useValue: screenSizeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    screenSizeService = TestBed.inject(ScreenSizeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize year and month correctly', () => {
    component.post = mockPost;
    component.ngOnInit();
    expect(component.year).toBe(getYear(mockPost.attributes.date));
    expect(component.month).toBe(getMonth(mockPost.attributes.date));
  });

  it('should subscribe to screenWidth$ and update isSmallScreen', () => {
    const screenWidthSpy = vi
      .spyOn(screenSizeService, 'screenWidth', 'get')
      .mockReturnValue(of(smallBreakpointSize - 1));
    component.post = mockPost;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isSmallScreen).toBe(true);
    screenWidthSpy.mockReturnValue(of(smallBreakpointSize + 1));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isSmallScreen).toBe(false);
  });

  it('should set showSkeleton to false when onLoad is called', () => {
    component.onLoad();
    expect(component.showSkeleton()).toBe(false);
  });

  it('should render the post title and description', () => {
    component.post = mockPost;
    component.ngOnInit();
    fixture.detectChanges();
    const titleElement: Element = fixture.nativeElement.querySelector(
      '.text-lg.font-bold a',
    );
    const descriptionElement = fixture.debugElement.query(
      By.css('[data-testid="description"]'),
    );
    const descriptionText: string =
      descriptionElement.nativeElement.textContent.trim();
    expect(titleElement.textContent).toContain(mockPost.attributes.title);
    expect(descriptionText).toContain(mockPost.attributes.description);
  });

  it('should display the updated and posted dates', () => {
    component.post = mockPost;
    component.ngOnInit();
    fixture.detectChanges();
    const updatedDateElement: Element =
      fixture.nativeElement.querySelector('.text-xs.pt-1');
    const postedDateElement: Element = fixture.nativeElement.querySelector(
      '.text-xs.pt-1:last-child',
    );
    expect(updatedDateElement.textContent).toContain('Updated Jan 10, 2023');
    expect(postedDateElement.textContent).toContain('Posted Jan 1, 2023');
  });

  it('should display the category as a pill', () => {
    component.post = mockPost;
    component.ngOnInit();
    fixture.detectChanges();
    const appPillElement = fixture.nativeElement.querySelector('app-pill');
    expect(appPillElement.textContent).toContain(
      getTitleCase(mockPost.attributes.category),
    );
  });

  it('should hide the image if showSkeleton is true', () => {
    component.post = mockPost;
    component.showSkeleton.set(true);
    fixture.detectChanges();
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement.style.visibility).toBe('hidden');
  });

  it('should show the image if showSkeleton is false', () => {
    component.post = mockPost;
    component.showSkeleton.set(false);
    fixture.detectChanges();
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement.style.visibility).toBe('visible');
  });
});
