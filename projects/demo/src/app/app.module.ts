import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMatPopoverModule } from 'projects/ngx-mat-popover/src/public-api';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NgxMatPopoverModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
