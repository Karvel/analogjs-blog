import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { MarkdownComponent } from '@analogjs/content';
import IndexPageComponent from './index.page';
import { provideRouter } from '@angular/router';

@Component({ selector: 'app-markdown-content', standalone: true, template: '' })
class FakeMarkdownComponent {}

vi.mock('@analogjs/content', () => ({
  MarkdownComponent: vi.fn(),
  injectContent: vi.fn(),
}));

describe('IndexPageComponent', () => {
  let component: IndexPageComponent;
  let fixture: ComponentFixture<IndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPageComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(IndexPageComponent, {
        remove: { imports: [MarkdownComponent] },
        add: { imports: [FakeMarkdownComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
