import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  template: `
    <div class="md:max-w md:mx-auto md:flex md:flex-col md:items-center">
      <div class="md:w-[48rem] p-4">
        <div class="flex-1">
          <h1 class="md:flex md:flex-col md:self-start">
            Category: {{ categoryName }}
          </h1>
        </div>
      </div>
    </div>
  `,
})
export default class CategoryNamePageComponent implements OnInit {
  public categoryName!: string;

  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') || '';
  }
}
