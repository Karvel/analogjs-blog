import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import ImageInfoPopoverContentComponent from './image-info-popover-content';

@Component({
  template: `
    <app-image-info-popover-content
      [cover_image_author]="coverImageAuthor"
      [cover_image_source]="coverImageSource"
      [cover_image_title]="coverImageTitle"
    ></app-image-info-popover-content>
  `,
})
class TestHostComponent {
  coverImageAuthor: string | undefined = 'Author';
  coverImageSource: string | undefined = 'Source URL';
  coverImageTitle: string | undefined = 'Image Title';
}

describe('ImageInfoPopoverContentComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: ImageInfoPopoverContentComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ImageInfoPopoverContentComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(ImageInfoPopoverContentComponent),
    ).componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cover image title', () => {
    fixture.detectChanges();
    const titleElement = debugElement.query(By.css('a'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Image Title');
  });

  it('should display cover image author if provided', () => {
    fixture.detectChanges();
    const authorElement = debugElement.query(By.css('span'));
    expect(authorElement.nativeElement.textContent.trim()).toBe('by Author');
  });

  it('should not display cover image author if not provided', () => {
    hostComponent.coverImageAuthor = undefined;
    fixture.detectChanges();
    const authorElement = debugElement.query(By.css('span'));
    expect(authorElement).toBeNull();
  });
});
