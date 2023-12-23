import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <nav aria-label="Page navigation">
      <ul>
        <li [class.disabled]="currentPage === 1">
          <a (click)="previousPage()">Previous</a>
        </li>
        <li *ngFor="let page of getPagesArray(); let i = index">
          <a (click)="changePage(i + 1)">{{ i + 1 }}</a>
        </li>
        <li [class.disabled]="currentPage === totalPages">
          <a (click)="nextPage()">Next</a>
        </li>
      </ul>
    </nav>
  `,
})
export class PaginatorComponent implements OnInit {
  @Input() itemsPerPage = 10;
  @Input() totalItems = 0;

  @Output() pageChanged = new EventEmitter<number>();

  public currentPage = 1;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit() {
    this.addRouteListener();
  }

  public changePage(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }

    // Update the query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  public getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  private addRouteListener(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page');
      if (page) {
        this.currentPage = parseInt(page, 10);
        this.pageChanged.emit(this.currentPage);
      } else {
        this.setPageOnBareRoute();
      }
    });
  }

  private setPageOnBareRoute(): void {
    this.changePage(this.currentPage);
  }
}
