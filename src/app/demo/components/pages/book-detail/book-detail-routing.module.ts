import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookDetailComponent } from './book-detail.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BookDetailComponent }
	])],
	exports: [RouterModule]
})
export class BookDetailRoutingModule { }
