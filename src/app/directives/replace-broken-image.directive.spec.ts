import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { fallbackImagePath } from '@constants/fallback-image-path';
import { siteName } from '@constants/site-name';
import { ReplaceBrokenImageDirective } from './replace-broken-image.directive';

@Component({
  template: ` <img src="test" alt="test" appReplaceBrokenImage /> `,
})
class TestComponent {}

describe('ReplaceBrokenImageDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[]; // the three elements w/ the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReplaceBrokenImageDirective],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding

    // all elements with an attached ReplaceBrokenImageDirective
    des = fixture.debugElement.queryAll(
      By.directive(ReplaceBrokenImageDirective),
    );
  });

  it('should set src and alt attributes on error', () => {
    const nativeElement = fixture.nativeElement;
    const imgElement = nativeElement.querySelector('img');

    // Simulate an error event
    imgElement.dispatchEvent(new Event('error'));

    const location = 'http://localhost:3000/';
    // Ensure that the src and alt attributes are updated
    expect(imgElement.src).toBe(`${location}${fallbackImagePath}`);
    expect(imgElement.alt).toBe(`${siteName}`);
  });
});
