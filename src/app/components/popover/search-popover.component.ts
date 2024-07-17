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
import { SearchResultSection } from '@models/search';
import { sortByUpdatedOrOriginalDate } from '@utils/sort-by-updated-or-original-date';

@Component({
  selector: 'app-search-popover',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  template: `
    <div
      class="container absolute top-7 right-0 w-80 z-50 bg-white dark:bg-[#242424] rounded-md p-3 text-slate-900 dark:text-neutral-100 border-2 dark:border-white border-slate-900"
    >
      <div [formGroup]="form">
        <input
          class="w-full rounded-sm bg-neutral-200 dark:bg-neutral-700 px-2"
          type="text"
          formControlName="search"
          placeholder="Search here"
        />
      </div>
      <div *ngIf="searchResults?.length; else empty" class="pt-3">
        Results:
        <ul>
          <li *ngFor="let section of searchResults">
            <ng-container *ngIf="section?.results?.length">
              <ul>
                <li *ngFor="let post of section.results">
                  {{ post.title }}
                </li>
              </ul>
            </ng-container>
          </li>
        </ul>
      </div>
      <ng-template #empty><p class="pt-4">No Results</p></ng-template>
    </div>
  `,
})
export class SearchPopoverComponent implements OnInit {
  public form!: FormGroup;
  public posts = injectContentFiles<BlogPost>((mdFile) =>
    mdFile.filename.includes('/src/content/posts'),
  ).sort(sortByUpdatedOrOriginalDate);
  public searchResults!: SearchResultSection[];

  private destroyRef = inject(DestroyRef);

  constructor() {
    this.form = new FormBuilder().nonNullable.group({
      search: new FormControl(''),
    });
  }

  public ngOnInit(): void {
    this.form
      .get('search')
      ?.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
      )
      .subscribe(() => {
        // send to search service
      });
  }
}
