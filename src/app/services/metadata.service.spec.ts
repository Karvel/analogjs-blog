import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

import { ContentFile } from '@analogjs/content';
import { vi } from 'vitest';

import { metadataTags } from '@constants/metadata-tags';
import { BlogPost } from '@models/post';
import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  let service: MetadataService;
  let meta: Meta;
  let title: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetadataService],
    });

    service = TestBed.inject(MetadataService);
    document = TestBed.inject(DOCUMENT);
    meta = TestBed.inject(Meta);
    title = TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove metadata tags', () => {
    vi.spyOn(meta, 'removeTag');
    service.removeTags();
    expect(meta.removeTag).toHaveBeenCalledTimes(metadataTags.length);
  });

  it('should set canonical URL', () => {
    const url = 'https://example.com';
    const createElementSpy = vi.spyOn(document, 'createElement');
    vi.spyOn(document, 'querySelector').mockReturnValue(null);
    vi.spyOn(document.head, 'appendChild');
    vi.spyOn(meta, 'updateTag');

    service.setCanonicalUrl(url);

    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(document.head.appendChild).toHaveBeenCalled();
    expect(meta.updateTag).toHaveBeenCalledTimes(2);
  });

  it('should set meta tags from front matter', () => {
    const frontMatter: ContentFile<BlogPost> = {
      attributes: {
        description: 'Test description',
        author: 'Test author',
        cover_image: 'Test cover image',
        date: '2023-09-28T00:00:00Z',
        last_updated: '2023-09-29T00:00:00Z',
        tags: 'test1, test2, test3',
      },
      filename: 'test.md',
      slug: 'test',
    };

    vi.spyOn(meta, 'updateTag');

    service.setMetaTagsFromFrontMatter(frontMatter);

    expect(meta.updateTag).toHaveBeenCalledTimes(9);
  });

  it('should skip meta tags from front matter that are empty', () => {
    const frontMatter: ContentFile<BlogPost> = {
      attributes: {
        description: '',
        author: '',
        cover_image: '',
        date: '',
        last_updated: '',
        tags: '',
      },
      filename: '',
      slug: '',
    };

    vi.spyOn(meta, 'updateTag');

    service.setMetaTagsFromFrontMatter(frontMatter);

    expect(meta.updateTag).toHaveBeenCalledTimes(0);
  });

  it('should set page URL meta tags', () => {
    const pageUrl = 'https://example.com';
    vi.spyOn(meta, 'updateTag');

    service.setPageURLMetaTags(pageUrl);

    expect(meta.updateTag).toHaveBeenCalledTimes(2);
  });

  it('should set page URL meta title', () => {
    const titleValue = 'Test Title';
    vi.spyOn(meta, 'updateTag');

    service.setPageURLMetaTitle(titleValue);

    expect(meta.updateTag).toHaveBeenCalledTimes(3);
  });

  it('should set title', () => {
    const titleValue = 'Test Title';
    vi.spyOn(title, 'setTitle');

    service.setTitle(titleValue);

    expect(title.setTitle).toHaveBeenCalledWith(titleValue);
  });

  it('should update tag', () => {
    const tag = { name: 'description', content: 'Updated description' };
    vi.spyOn(meta, 'removeTag');
    vi.spyOn(meta, 'updateTag');

    service.updateTag(tag);

    expect(meta.removeTag).toHaveBeenCalled();
    expect(meta.updateTag).toHaveBeenCalledWith(tag);
  });

  it('should update tags', () => {
    const tags = [
      { name: 'description', content: 'Updated description' },
      { name: 'author', content: 'Updated author' },
    ];

    vi.spyOn(meta, 'updateTag');

    service.updateTags(tags);

    expect(meta.updateTag).toHaveBeenCalledTimes(tags.length);
  });
});
