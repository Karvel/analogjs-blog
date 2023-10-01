import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import FooterComponent from './footer.component';

@Component({
  template: '<app-footer></app-footer>',
})
class TestHostComponent {}

describe('FooterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [FooterComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display the current year in the footer', () => {
    const footerComponent = fixture.debugElement.query(
      By.directive(FooterComponent),
    );
    const currentYear = new Date().getFullYear().toString();
    fixture.detectChanges();
    const footerContent = footerComponent.nativeElement.textContent;

    expect(footerContent).toContain(currentYear);
  });

  it('should display links in the footer', () => {
    const footerComponent = fixture.debugElement.query(
      By.directive(FooterComponent),
    );
    const linkElements = footerComponent.queryAll(By.css('a'));

    expect(linkElements.length).toBeGreaterThan(0);
  });
});
