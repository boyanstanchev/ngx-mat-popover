import { Component, Inject, TemplateRef } from '@angular/core';
import { CLOSE, TEMPLATE_REF } from './ngx-mat-popover.directive';

@Component({
	template: `
		<mat-card class="mat-elevation-z15">
			<div class="close-btn-container">
				<button class="close-btn" (click)="close()" mat-icon-button>
					<mat-icon
						aria-hidden="false"
						aria-label="Example home icon"
						fontIcon="close"
					></mat-icon>
					<!-- <mat-icon>close</mat-icon> -->
				</button>
			</div>

			<mat-card-content>
				<ng-container *ngTemplateOutlet="templateRef"></ng-container>
			</mat-card-content>
		</mat-card>
	`,
	styles: [
		`
			.mat-card {
				display: flex;
				flex-direction: row-reverse;
			}

			.close-btn-container {
				width: 37px;
			}

			.close-btn {
				margin: -12px -12px -12px 8px;
			}
		`,
	],
})
export class NgxMatPopoverContainerComponent {
	constructor(
		@Inject(TEMPLATE_REF) public templateRef: TemplateRef<unknown>,
		@Inject(CLOSE) public close: () => void,
	) {}
}
