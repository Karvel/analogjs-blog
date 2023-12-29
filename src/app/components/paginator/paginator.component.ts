import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  defaultPageOptions,
  setPageSizeOptions,
} from '@utils/get-page-options';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ReactiveFormsModule],
  template: `
    <nav
      aria-label="Page navigation"
      class="flex items-center justify-center gap-3 mb-3"
    >
      <div class="flex items-center justify-center gap-3 mb-3">
        <a
          class="inline-flex h-8 w-8 items-center justify-center cursor-pointer rounded border border-gray-300 bg-white text-neutral-900 dark:border-neutral-400 dark:bg-neutral-900 dark:text-white rtl:rotate-180"
          [routerLink]="'/blog'"
          [queryParams]="{ page: previousPage() }"
          queryParamsHandling="merge"
          tabindex="0"
        >
          <span class="sr-only">Next Page</span>
          <svg
            class="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>

        <p class="text-xs">
          {{ currentPage }}
          <span class="mx-0.25">/</span>
          {{ totalPages }}
        </p>

        <a
          class="inline-flex h-8 w-8 items-center justify-center cursor-pointer rounded border border-gray-300 bg-white text-neutral-900 dark:border-neutral-400 dark:bg-neutral-900 dark:text-white rtl:rotate-180"
          [routerLink]="'/blog'"
          [queryParams]="{ page: nextPage() }"
          queryParamsHandling="merge"
          tabindex="0"
        >
          <span class="sr-only">Next Page</span>
          <svg
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <select
        *ngIf="pageSizeControl"
        [formControl]="pageSizeControl"
        aria-label="Page Size Selector"
        class="mb-3 border border-gray-300 bg-white text-neutral-900 text-sm rounded block p-[.375rem] dark:bg-neutral-900
        dark:border-neutral-400 dark:text-white"
      >
        <ng-container *ngFor="let option of options">
          <option [value]="option.value">{{ option.label }}</option>
        </ng-container>
      </select>
    </nav>
  `,
})
export class PaginatorComponent implements OnInit {
  @Input() itemsPerPage = 10;
  @Input() totalItems = 0;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  public currentPage = 1;
  public options = defaultPageOptions;
  public pageSizeControl!: FormControl;

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  public ngOnInit(): void {
    this.addRouteListener();
    this.options = setPageSizeOptions(this.totalItems) ?? defaultPageOptions;
    this.addPageSizeListener();
  }

  public changePage(page: number): void {
    this.currentPage = page;

    // Update the query parameter
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  public nextPage(): number {
    return this.currentPage < this.totalPages
      ? this.currentPage + 1
      : this.currentPage;
  }

  public previousPage(): number {
    return this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
  }

  private addRouteListener(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page');
      if (page) {
        this.currentPage = parseInt(page, 10);
        this.pageChanged.emit(this.currentPage);
      } else {
        this.changePage(1);
      }
    });
  }

  private addPageSizeListener(): void {
    this.pageSizeControl = new FormControl(this.itemsPerPage);
    this.pageSizeControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newSize) => {
        this.itemsPerPage = newSize;
        this.pageSizeChanged.emit(this.itemsPerPage);
        this.changePage(1); // Reset to page 1 whenever page size changes
      });
  }
}
