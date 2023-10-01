import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import PopoverComponent from './popover.component';

@Component({
  template: `
    <app-popover [icon]="icon" [altText]="altText">
      <div class="popover-content">Popover Content</div>
    </app-popover>
  `,
})
class TestHostComponent {
  icon: string | undefined = 'path/to/icon.png';
  altText: string | undefined = 'Alt Text';
}

describe('PopoverComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let popoverComponent: PopoverComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [PopoverComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    popoverComponent = fixture.debugElement.query(
      By.directive(PopoverComponent),
    ).componentInstance;
  });

  it('should create', () => {
    expect(popoverComponent).toBeTruthy();
  });

  it('should toggle isActive when clicked', () => {
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(popoverComponent.isActive).toBe(false);

    imgElement.click();
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(true);

    imgElement.click();
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(false);
  });

  it('should toggle isActive when Enter key pressed', () => {
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(popoverComponent.isActive).toBe(false);

    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    imgElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(true);

    imgElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(false);
  });
});
