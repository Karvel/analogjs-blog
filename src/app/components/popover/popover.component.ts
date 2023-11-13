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

@Component({
  selector: 'app-popover',
  standalone: true,
  template: `
    <img
      #popoverIcon
      (click)="toggle()"
      (keypress)="toggle()"
      [src]="icon"
      [alt]="altText"
      class="cursor-pointer drop-shadow-lg"
      loading="lazy"
      tabindex="0"
      width="20"
    />
    <div
      #popover
      class="popover absolute right-4 bottom-12 pointer-events-none transition duration-500 ease-in-out"
      [class.active]="isActive"
    >
      <ng-content />
    </div>
  `,
  styleUrls: ['./popover.component.css'],
})
export default class PopoverComponent implements OnInit, OnDestroy {
  @Input() public altText!: string | undefined;
  @Input() public icon!: string | undefined;

  @ViewChild('popoverIcon') popoverIcon!: ElementRef;
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
        !this.popoverIcon.nativeElement.contains(e.target) &&
        !this.popover.nativeElement.contains(e.target)
      ) {
        this.isActive = false;
      }
    });
  }
}
