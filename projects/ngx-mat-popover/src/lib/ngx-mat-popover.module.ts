import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatPopoverContainerComponent } from './ngx-mat-popover-container.component';
import { NgxMatPopoverDirective } from './ngx-mat-popover.directive';

@NgModule({
	declarations: [NgxMatPopoverContainerComponent, NgxMatPopoverDirective],
	imports: [OverlayModule, MatCardModule, MatButtonModule, MatIconModule],
	exports: [NgxMatPopoverDirective],
})
export class NgxMatPopoverModule {}
