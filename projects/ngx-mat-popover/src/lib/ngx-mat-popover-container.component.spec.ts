import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatPopoverContainerComponent } from './ngx-mat-popover-container.component';

describe('NgxMatPopoverContainerComponent', () => {
	let component: NgxMatPopoverContainerComponent;
	let fixture: ComponentFixture<NgxMatPopoverContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxMatPopoverContainerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxMatPopoverContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
