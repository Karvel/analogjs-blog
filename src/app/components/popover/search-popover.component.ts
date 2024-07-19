import { injectContentFiles } from '@analogjs/content';
import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { debounceTime } from 'rxjs';

import { BlogPost } from '@models/post';
import { SearchResult } from '@models/search';
import { SearchService } from '@services/search.service';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';
import { RouterLink } from '@angular/router';
import { HighlightPipe } from 'app/pipes/highlight.pipe';

@Component({
  selector: 'app-search-popover',
  standalone: true,
  imports: [HighlightPipe, NgFor, NgIf, ReactiveFormsModule, RouterLink],
  template: `
    <div
      class="container absolute top-7 right-0 w-80 z-50 bg-white dark:bg-[#242424] rounded-md p-3 text-slate-900 dark:text-neutral-100 border-2 dark:border-white border-slate-900"
    >
      <div [formGroup]="form">
        <label for="search" [attr.aria-label]="'Search'" tabindex="0">
          <input
            class="w-full rounded-sm bg-neutral-200 dark:bg-neutral-700 px-2"
            id="search"
            formControlName="search"
            placeholder="Search here"
            type="text"
          />
        </label>
      </div>
      <ng-container
        *ngIf="
          searchValue.length && searchResults?.isSearchTooShort;
          else canSearch
        "
        ><p class="pt-3">Search query is too short</p></ng-container
      >
      <ng-template #canSearch>
        <div
          *ngIf="searchResults?.results?.length; else noResults"
          class="pt-3"
        >
          Results:
          <ul>
            <li
              *ngFor="let result of searchResults.results"
              class="list-disc ml-4"
            >
              <ng-container *ngIf="result.slug && result.title">
                <a
                  [routerLink]="'/blog/' + result.slug"
                  [innerHTML]="result.title | highlight : searchValue"
                  class="no-underline"
                >
                </a>
              </ng-container>
            </li>
          </ul>
        </div>
      </ng-template>
      <ng-template #noResults><p class="pt-3">No results</p></ng-template>
    </div>
  `,
})
export class SearchPopoverComponent implements OnInit {
  public form!: FormGroup;
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public searchResults!: SearchResult;

  private destroyRef = inject(DestroyRef);
  private searchService = inject(SearchService);

  constructor() {
    this.form = new FormBuilder().nonNullable.group({
      search: new FormControl(''),
    });
  }

  public get searchValue(): string {
    return this.form.get('search')?.value;
  }

  public ngOnInit(): void {
    this.form
      .get('search')
      ?.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
      )
      .subscribe((value) => {
        this.searchResults = this.searchService.search(this.posts, value);
      });
  }
}
