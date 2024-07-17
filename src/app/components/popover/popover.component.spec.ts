import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2, Type } from '@angular/core';

import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let popoverComponent: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;
  let renderer2: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopoverComponent],
      providers: [Renderer2],
    });

    fixture = TestBed.createComponent(PopoverComponent);
    popoverComponent = fixture.componentInstance;
    fixture.detectChanges();
    renderer2 = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>,
    );
    vi.spyOn(renderer2, 'listen');
  });

  it('should create', () => {
    expect(popoverComponent).toBeTruthy();
  });

  it('should initialize event listeners on ngOnInit', () => {
    popoverComponent.ngOnInit();
    expect(renderer2.listen).toHaveBeenCalledTimes(2);
  });

  it('should remove event listeners on ngOnDestroy', () => {
    popoverComponent.ngOnDestroy();
    expect(renderer2.listen).not.toHaveBeenCalled();
  });

  it('toggle() should toggle isActive state', () => {
    expect(popoverComponent.isActive).toBe(false);
    popoverComponent.toggle();
    expect(popoverComponent.isActive).toBe(true);
    popoverComponent.toggle();
    expect(popoverComponent.isActive).toBe(false);
  });

  it('should toggle isActive when clicked', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svgElement: any = fixture.nativeElement.querySelector('svg-icon');
    expect(popoverComponent.isActive).toBe(false);

    svgElement.click();
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(true);

    svgElement.click();
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(false);
  });

  it('should toggle isActive when Enter key pressed', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svgElement: any = fixture.nativeElement.querySelector('svg-icon');
    expect(popoverComponent.isActive).toBe(false);

    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    svgElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(true);

    svgElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(popoverComponent.isActive).toBe(false);
  });
});
