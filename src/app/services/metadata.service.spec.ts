import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { vi } from 'vitest';

import { metadataTags } from '@constants/metadata-tags';
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

  it('should set title', () => {
    const titleValue = 'Test Title';
    vi.spyOn(title, 'setTitle');

    service.setTitle(titleValue);

    expect(title.setTitle).toHaveBeenCalledWith(titleValue);
  });
});
