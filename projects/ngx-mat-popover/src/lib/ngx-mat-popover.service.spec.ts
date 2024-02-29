import { TestBed } from '@angular/core/testing';

import { NgxMatPopoverService } from './ngx-mat-popover.service';

describe('NgxMatPopoverService', () => {
	let service: NgxMatPopoverService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NgxMatPopoverService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
