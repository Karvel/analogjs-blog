import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { MarkdownComponent } from '@analogjs/content';
import { provideRouter } from '@angular/router';
import BlogPostPageComponent from './[year].[month].[slug].page';
import { of } from 'rxjs';

@Component({ selector: 'app-markdown-content', standalone: true, template: '' })
class FakeMarkdownComponent {}

vi.mock('@analogjs/content', () => ({
  MarkdownComponent: vi.fn(),
  injectContent: vi.fn(() =>
    of({
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    }),
  ),
  injectContentFiles: vi.fn(() => [
    {
      filename: '',
      slug: 'sample-post',
      attributes: { date: new Date(2023, 3, 1), published: true },
    },
  ]),
}));

describe('BlogPostPageComponent', () => {
  let component: BlogPostPageComponent;
  let fixture: ComponentFixture<BlogPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostPageComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(BlogPostPageComponent, {
        remove: { imports: [MarkdownComponent] },
        add: { imports: [FakeMarkdownComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
