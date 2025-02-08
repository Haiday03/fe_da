import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublisherComponent } from './publisher.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PublisherComponent }
	])],
	exports: [RouterModule]
})
export class PublisherRoutingModule { }
