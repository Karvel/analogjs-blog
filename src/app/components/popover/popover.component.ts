import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  template: `
    <img
      (click)="toggle()"
      (keypress)="toggle()"
      [src]="icon"
      [alt]="altText"
      class="cursor-pointer drop-shadow-lg"
      tabindex="0"
      width="20"
    />
    <div
      class="popover absolute right-4 bottom-12 pointer-events-none transition duration-500 ease-in-out"
      [class.active]="isActive"
    >
      <ng-content />
    </div>
  `,
  styleUrls: ['./popover.component.scss'],
})
export default class PopoverComponent {
  @Input() public altText!: string | undefined;
  @Input() public icon!: string | undefined;

  public isActive = false;

  public toggle(): void {
    this.isActive = !this.isActive;
  }
}
