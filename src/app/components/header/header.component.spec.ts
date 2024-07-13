import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import HeaderComponent from './header.component';

@Component({
  template: '<app-header />',
})
class TestHostComponent {
  showMenu = false;
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display site name', () => {
    fixture.detectChanges();
    const siteNameElement = fixture.debugElement.query(
      By.css('.font-semibold'),
    );
    expect(siteNameElement.nativeElement.textContent).toContain(
      'Hapax Legomenon',
    );
  });

  it('should display navigation links', () => {
    fixture.detectChanges();
    const linkElements = fixture.debugElement.queryAll(By.css('li'));
    expect(linkElements.length).toBeGreaterThan(0); // Check if there are navigation links
  });
});
