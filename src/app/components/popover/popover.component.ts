import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';

import { SvgIconComponent, SvgIcons } from '@ngneat/svg-icon';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  template: `
    <svg-icon
      #popoverIcon
      (click)="toggle()"
      (keypress)="toggle()"
      [key]="icon"
      [attr.alt]="altText"
      [ngClass]="{
        'drop-shadow-lg': hasDropShadow,
      }"
      class="cursor-pointer"
      tabindex="0"
      height="20px"
      width="20px"
    />
    <div
      #popover
      class="popover pointer-events-none"
      [class.active]="isActive"
      [ngClass]="{
        'transition duration-500 ease-in-out': hasTransition,
      }"
    >
      <ng-content />
    </div>
  `,
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit, OnDestroy {
  @Input() public altText!: string | undefined;
  @Input() public icon!: SvgIcons;
  @Input() public hasDropShadow: boolean = true;
  @Input() public hasTransition: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('popoverIcon') popoverIcon!: any;
  @ViewChild('popover') popover!: ElementRef;

  public isActive = false;

  private clickListener!: () => void;
  private keyPressListener!: () => void;
  private renderer = inject(Renderer2);

  public ngOnInit(): void {
    this.clickListener = this.initializeListener('window', 'click');
    this.keyPressListener = this.initializeListener('window', 'keypress');
  }

  public ngOnDestroy(): void {
    this.clickListener();
    this.keyPressListener();
  }

  public toggle(): void {
    this.isActive = !this.isActive;
  }

  private initializeListener(target: string, eventName: string): () => void {
    return this.renderer.listen(target, eventName, (e: Event) => {
      if (
        !this.popoverIcon.host.nativeElement.contains(e.target) &&
        !this.popover.nativeElement.contains(e.target)
      ) {
        this.isActive = false;
      }
    });
  }
}
