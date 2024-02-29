import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
	ElementRef,
	InjectionToken,
	Injector,
	ViewContainerRef,
} from '@angular/core';
import { Directive, HostListener, Input, TemplateRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { NgxMatPopoverContainerComponent } from './ngx-mat-popover-container.component';

export const TEMPLATE_REF = new InjectionToken<TemplateRef<unknown>>(
	'TEMPLATE_REF',
);
export const CLOSE = new InjectionToken<() => void>('CLOSE');

@Directive({
	selector: '[matPopover]',
})
export class NgxMatPopoverDirective {
	@Input()
	matPopover: TemplateRef<unknown>;

	@HostListener('mouseenter')
	onMouseEnter(): void {
		this._showPopover();
	}

	@HostListener('click')
	onClick(): void {
		this._showPopover(true);
	}

	private _overlayRef: OverlayRef;

	private _subscriptions: Subscription[] = [];

	constructor(
		private _overlay: Overlay,
		private _elementRef: ElementRef,
		private _viewContainerRef: ViewContainerRef,
		private _injector: Injector,
	) {}

	private _showPopover(clicked?: boolean): void {
		if (!this._overlayRef) {
			const positionStrategy = this._overlay
				.position()
				.flexibleConnectedTo(this._elementRef)
				.withPositions([
					{
						originX: 'start',
						originY: 'bottom',
						overlayX: 'start',
						overlayY: 'top',
					},
				]);

			this._overlayRef = this._overlay.create({
				positionStrategy,
				hasBackdrop: clicked,
				backdropClass: clicked ? 'popover-backdrop' : undefined,
			});

			// Close popover on backdrop click
			const buttonClickSub$ = this._overlayRef
				.outsidePointerEvents()
				.subscribe((e) => {
					if (e.type === 'click') {
						this._hidePopover();
					}
				});

			this._subscriptions.push(buttonClickSub$);

			const container = new ComponentPortal(
				NgxMatPopoverContainerComponent,
				this._viewContainerRef,
				Injector.create({
					parent: this._injector,
					providers: [
						{ provide: TEMPLATE_REF, useValue: this.matPopover },
						{ provide: CLOSE, useValue: this._hidePopover.bind(this) },
					],
				}),
			);

			const containerRef = this._overlayRef.attach(container);

			if (!clicked) {
				const btnMouseLeaveSub$ = fromEvent<MouseEvent>(
					this._elementRef.nativeElement as HTMLElement,
					'mouseleave',
				).subscribe((event) => {
					if (
						event.relatedTarget !==
						containerRef.location.nativeElement.children[0]
					) {
						this._hidePopover();
					}
				});

				this._subscriptions.push(btnMouseLeaveSub$);

				const containerMouseLeaveSub$ = fromEvent(
					containerRef.location.nativeElement as HTMLElement,
					'mouseleave',
				).subscribe(() => {
					this._hidePopover();
				});

				this._subscriptions.push(containerMouseLeaveSub$);
			}
		}
	}

	private _hidePopover(): void {
		if (this._overlayRef) {
			this._overlayRef.detach();
			this._overlayRef = null;
		}

		this._subscriptions.forEach((sub) => sub.unsubscribe());
	}
}
