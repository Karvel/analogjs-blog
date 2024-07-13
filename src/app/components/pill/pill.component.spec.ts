import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import PillComponent from './pill.component';

@Component({
  template: '<app-pill [label]="label" [route]="route" [slug]="slug" />',
})
class TestHostComponent {
  label: string | undefined;
  route: string | undefined;
  slug: string | undefined;
}

describe('PillComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [PillComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display the label in title case', () => {
    const label = 'sample label';
    testHost.label = label;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('a'));
    const buttonInnerText = buttonElement.nativeElement.textContent.trim();

    expect(buttonInnerText).toBe('Sample Label');
  });
});
